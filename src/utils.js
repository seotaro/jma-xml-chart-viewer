import { settings } from './settings'

// 天気図のリストを取得する。
export async function getChartTimeline(type) {
    const url = `${settings.api.jmaxml}/${type}?count=${settings.timeline.count}`;
    return fetch(url)
        .then(res => {
            return res.text();
        })
        .then(text => {
            // 日時の文字列を Date オブジェクトにする。
            const reviver = ((key, value) => {
                return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(value) ? new Date(value) : value;
            });
            return JSON.parse(text, reviver);
        })
        .then(list => {
            // datetime 昇順でソートして返す。
            return list.sort((a, b) => {
                const x = a.datetime.getTime();
                const y = b.datetime.getTime();
                if (x < y)
                    return -1;
                if (y < x)
                    return 1;
                return 0;
            });
        })
        .catch((err) => {
            console.error(`${err}`);
        });
}

// 天気図（の GeoJson ）を取得する。
export async function getChart(timeline, index, type) {
    const url = `${settings.api.xml2geojson}/?url=${timeline[index].url}`
    return fetch(url)
        .then(res => {
            return res.text();
        })
        .then(text => {
            // 日時の文字列を Date オブジェクトにする。
            const reviver = ((key, value) => {
                return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(value) ? new Date(value) : value;
            });
            return JSON.parse(text, reviver);
        })
        .then(geojson => {
            // 要素毎にレイヤーに分ける。
            const title = { ...geojson.properties, type: type, code: settings.chartTypes[type].code };
            const isobars = getIsobars(geojson);
            const fronts = getFronts(geojson);
            const ices = getIces(geojson);
            const fogs = getFogs(geojson);
            const windArrows = getStrongWinds(geojson);
            const centerMarks = getCenters(geojson);
            const centerPressureTexts = getCenterPressureTexts(geojson);
            const centerSpeedTexts = getCenterSpeedTexts(geojson);
            const isobarTexts = getIsobarTexts(geojson);
            return {
                fronts: fronts,
                isobars: isobars,
                title: title,
                windArrows: windArrows,
                centerMarks: centerMarks,
                ices: ices,
                fogs: fogs,
                centerPressureTexts: centerPressureTexts,
                centerSpeedTexts: centerSpeedTexts,
                isobarTexts: isobarTexts
            };
        })
        .catch((err) => {
            console.error(`${err}`);
        });
}

// LineLayer の緯線経線データを返す。
export const latlonlineGeoJson = (() => {
    const d = 1;  // [°]。精度みたいなもの。
    const dlon = 10;  // [°]。
    const dlat = 10;  // [°]。

    const geojson = {
        type: "FeatureCollection",
        features: [],
    };

    // 経線
    for (let lon = 180; -180 < lon; lon -= dlon) {
        const coordinates = [];
        for (let lat = -80; lat <= 80; lat += d) {
            coordinates.push([lon, lat]);
        }

        const feature = {
            type: "Feature",
            id: geojson.features.length,
            geometry: { type: 'LineString', coordinates: coordinates },
            properties: {},
            info: `${Math.abs(lon)}°${(lon < 0) ? 'W' : 'E'}`
        };
        geojson.features.push(feature);
    }

    // 緯線
    for (let lat = -80; lat < 90; lat += dlat) {
        const coordinates = [];
        for (let lon = -180; lon <= 180; lon += d) {
            coordinates.push([lon, lat]);
        }

        const feature = {
            type: "Feature",
            id: geojson.features.length,
            geometry: { type: 'LineString', coordinates: coordinates },
            properties: {},
            info: `${Math.abs(lat)}°${(lat < 0) ? 'S' : 'N'}`
        };
        geojson.features.push(feature);
    }

    return geojson;
})();

// 前線を返す。
function getFronts(geojson) {
    const STATIONARY_FRONT_SPACE = 20;  // 停滞前線の奇数偶数区間の間隔

    const ret = [];
    for (const feature of geojson.features) {
        switch (feature.properties.type) {
            case '寒冷前線':
            case '温暖前線':
            case '閉塞前線':
                const front = { ...feature };
                front.info = `${feature.properties.type}`;
                ret.push(front);
                break;

            case '停滞前線':
                {
                    // 偶数区間と奇数区間を交互に色分けする表現。破線にした feature を生成して追加する。元の'停滞前線'は削除する。

                    const lines = [];
                    for (let i = 0; i < (feature.geometry.coordinates.length - 1); i++) {
                        lines.push([feature.geometry.coordinates[i], feature.geometry.coordinates[i + 1]]);
                    }

                    const even = { ...feature };
                    const odd = { ...feature };
                    odd.properties = { ...feature.properties };
                    even.properties = { ...feature.properties };
                    odd.geometry = { ...feature.geometry };
                    even.geometry = { ...feature.geometry };
                    odd.properties.type = '停滞前線（奇数）';
                    even.properties.type = '停滞前線（偶数）';
                    odd.geometry.type = 'MultiLineString';
                    even.geometry.type = 'MultiLineString';
                    odd.geometry.coordinates = lines.filter((line, i) => (parseInt(i / STATIONARY_FRONT_SPACE) % 2 === 0));
                    even.geometry.coordinates = lines.filter((line, i) => (parseInt(i / STATIONARY_FRONT_SPACE) % 2 !== 0));
                    odd.info = `${feature.properties.type}`;
                    even.info = `${feature.properties.type}`;

                    ret.push(odd);
                    ret.push(even);
                }
                break;
        }
    }

    return ret;
}

// 等圧線を返す。
function getIsobars(geojson) {
    const AUXILIARY_ISOBAR_SPACE = 10;  // 等圧線の補助線の破線間隔

    const ret = [];
    for (const feature of geojson.features) {
        switch (feature.properties.type) {
            case '等圧線':
                // レンダリングに必要な情報を補足する。

                const isobar = { ...feature };
                isobar.info = `等圧線（${isobar.properties.pressure.value} ${isobar.properties.pressure.unit}）`;

                if ((isobar.properties.pressure.value % 20) === 0) {
                    // 20hPa 毎の主線。
                    isobar.properties.type = '等圧線（主線）';
                    ret.push(isobar);

                } else if (isobar.properties.pressure.value % 4) {
                    // 補助線。

                    const lines = [];
                    for (let i = 0; i < (isobar.geometry.coordinates.length - 1); i++) {
                        lines.push([isobar.geometry.coordinates[i], isobar.geometry.coordinates[i + 1]]);
                    }

                    isobar.properties.type = '等圧線（補助）';
                    isobar.geometry = { ...feature.geometry };
                    isobar.geometry.type = 'MultiLineString';
                    isobar.geometry.coordinates = lines.filter((line, i) => (parseInt(i / AUXILIARY_ISOBAR_SPACE) % 2 === 0));
                    ret.push(isobar);
                }

                ret.push(isobar);
                break;
        }
    }

    return ret;
}

// 高気圧・低気圧などの中心マークを返す。
function getCenters(geojson) {
    const targets = ['台風', '低気圧', '高気圧', '熱帯低気圧', '低圧部'];
    return geojson.features
        .filter(x => targets.includes(x.properties.type))
        .map(x => {
            const xx = { ...x };
            if (xx.properties.type === '台風') {
                if (xx.properties.speed.value && xx.properties.direction.value) {
                    xx.info = `${xx.properties.type}（\n\
                                    T${xx.properties.number} \n名称 : ${xx.properties.nameKana} \n階級 : ${xx.properties.class}
                                    中心気圧 : ${xx.properties.pressure.value} ${xx.properties.pressure.unit} \n\
                                    進行速度 : ${xx.properties.speed.value} ${xx.properties.speed.unit} \n\
                                    進行方向 : ${xx.properties.direction.value} ${xx.properties.direction.unit} \n\
                                    風速 : ${xx.properties.windSpeed.value} ${xx.properties.windSpeed.unit}\n）`;
                } else if (xx.properties.speed.description && xx.properties.direction.condition) {
                    xx.info = `${xx.properties.type}（\n\
                                    T${xx.properties.number} \n名称 : ${xx.properties.nameKana} \n階級 : ${xx.properties.class}
                                    中心気圧 : ${xx.properties.pressure.value} ${xx.properties.pressure.unit} \n\
                                    ${xx.properties.speed.description} \n\
                                    風速 : ${xx.properties.windSpeed.value} ${xx.properties.windSpeed.unit}\n）`;
                } else {
                    xx.info = `${xx.properties.type}（\n\
                                    T${xx.properties.number} \n名称 : ${xx.properties.nameKana} \n階級 : ${xx.properties.class}
                                    中心気圧 : ${xx.properties.pressure.value} ${xx.properties.pressure.unit} \n\
                                    風速 : ${xx.properties.windSpeed.value} ${xx.properties.windSpeed.unit}\n）`;
                }
            } else {
                if (xx.properties.speed.value && xx.properties.direction.value) {
                    xx.info = `${xx.properties.type}（\n\
                                    中心気圧 : ${xx.properties.pressure.value} ${xx.properties.pressure.unit} \n\
                                    進行速度 : ${xx.properties.speed.value} ${xx.properties.speed.unit} \n\
                                    進行方向 : ${xx.properties.direction.value} ${xx.properties.direction.unit}\n）`;
                } else if (xx.properties.speed.description && xx.properties.direction.condition) {
                    xx.info = `${xx.properties.type}（\n\
                                    中心気圧 : ${xx.properties.pressure.value} ${xx.properties.pressure.unit} \n\
                                    ${xx.properties.speed.description}\n）`;
                } else {
                    xx.info = `${xx.properties.type}（\n\
                                    中心気圧 : ${xx.properties.pressure.value} ${xx.properties.pressure.unit} \n\
                                    \n）`;
                }
            }
            return xx;
        });
}

// 気圧値などテキストを返す。
function getCenterPressureTexts(geojson) {
    const targets = ['台風', '低気圧', '高気圧', '熱帯低気圧', '低圧部'];
    return geojson.features
        .filter(x => targets.includes(x.properties.type))
        .map(x => {
            const xx = { type: x.properties.type };
            xx.text = `${x.properties.pressure.value}`;
            xx.coordinates = x.geometry.coordinates;
            xx.info = `${x.properties.type}（中心気圧 : ${x.properties.pressure.value} ${x.properties.pressure.unit} ）`;
            return xx;
        });
}

// 中心の進行速度などテキストを返す。
function getCenterSpeedTexts(geojson) {
    const targets = ['台風', '低気圧', '高気圧', '熱帯低気圧', '低圧部'];
    return geojson.features
        .filter(x => targets.includes(x.properties.type))
        .map(x => {
            const xx = { type: x.properties.type };
            xx.text = x.properties.speed.value ? `${x.properties.speed.value} ${x.properties.speed.unit}` : '';
            xx.coordinates = x.geometry.coordinates;
            xx.info = `${x.properties.type}（進行速度 : ${x.properties.speed.value} ${x.properties.speed.unit} ）`;
            return xx;
        });
}

// 気圧値などテキストを返す。
function getIsobarTexts(geojson) {
    const targets = ['等圧線（主線）'];
    return geojson.features
        .filter(x => targets.includes(x.properties.type))
        .map(x => {
            const xx = { type: x.properties.type };
            xx.coordinates = x.geometry.coordinates[Math.floor(x.geometry.coordinates.length / 2)];
            xx.text = `${x.properties.pressure.value}`;
            xx.info = `${x.properties.type}（気圧 : ${x.properties.pressure.value} ${x.properties.pressure.unit} ）`;
            return xx;
        });
}

// 悪天情報の強風を返す。
function getStrongWinds(geojson) {
    const targets = ['悪天情報（強風）'];
    return geojson.features
        .filter(x => targets.includes(x.properties.type))
        .map(x => {
            const xx = { ...x };
            xx.info = `${xx.properties.type}（${xx.properties.windSpeedKnot.value} ${xx.properties.windSpeedKnot.unit}）`;
            return xx;
        });

}

// 悪天情報の海氷・船体着氷を返す。
function getIces(geojson) {
    const targets = ['悪天情報（海氷）', '悪天情報（船体着氷）'];
    return geojson.features
        .filter(x => targets.includes(x.properties.type))
        .map(x => {
            const xx = { ...x };
            xx.info = `${xx.properties.type}`;
            return xx;
        });
}

// 悪天情報の霧を返す。
function getFogs(geojson) {
    const targets = ['悪天情報（霧）'];
    return geojson.features
        .filter(x => targets.includes(x.properties.type))
        .map(x => {
            const xx = { ...x };
            xx.info = `${xx.properties.type}`;
            return xx;
        });;
}