
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
export function getFronts(geojson) {
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
export function getIsobars(geojson) {
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
export function getCenters(geojson) {
    const targets = ['台風', '低気圧', '高気圧', '熱帯低気圧', '低圧部'];
    return geojson.features
        .filter(x => targets.includes(x.properties.type))
        .map(x => {
            const xx = { ...x };
            if (xx.properties.type === '台風') {
                xx.info = `${xx.properties.type}（\n\
                                T${xx.properties.number} \n名称 : ${xx.properties.nameKana} \n階級 : ${xx.properties.class}
                                中心気圧 : ${xx.properties.pressure.value} ${xx.properties.pressure.unit} \n\
                                進行速度 : ${xx.properties.speed.value} ${xx.properties.speed.unit} \n\
                                進行方向 : ${xx.properties.direction.value} ${xx.properties.direction.unit} \n\
                                風速 : ${xx.properties.windSpeed.value} ${xx.properties.windSpeed.unit}\n）`;
            } else {
                xx.info = `${xx.properties.type}（\n\
                                中心気圧 : ${xx.properties.pressure.value} ${xx.properties.pressure.unit} \n\
                                進行速度 : ${xx.properties.speed.value} ${xx.properties.speed.unit} \n\
                                進行方向 : ${xx.properties.direction.value} ${xx.properties.direction.unit} \n）`;
            }
            return xx;
        });
}

// 悪天情報の強風を返す。
export function getStrongWinds(geojson) {
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
export function getIces(geojson) {
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
export function getFogs(geojson) {
    const targets = ['悪天情報（霧）'];
    return geojson.features
        .filter(x => targets.includes(x.properties.type))
        .map(x => {
            const xx = { ...x };
            xx.info = `${xx.properties.type}`;
            return xx;
        });;
}