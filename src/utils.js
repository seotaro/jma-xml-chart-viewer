
// LineLayer の緯線経線データを返す。
export const latlonline = (() => {
    const d = 1;  // [°]。精度みたいなもの。
    const dlon = 10;  // [°]。
    const dlat = 10;  // [°]。
    const lines = [];

    // 経線
    for (let lon = -180; lon < 180; lon += dlon) {
        for (let lat = -80; lat < 80; lat += d) {
            lines.push({ start: [lon, lat], end: [lon, lat + d], properties: { type: '経線', name: `${Math.abs(lon)}°${(lon < 0) ? 'W' : 'E'}` } });
        }
    }

    // 緯線
    for (let lat = -80; lat < 90; lat += dlat) {
        for (let lon = -180; lon < 180; lon += d) {
            lines.push({ start: [lon, lat], end: [lon + d, lat], properties: { type: '緯線', name: `${Math.abs(lat)}°${(lat < 0) ? 'S' : 'N'}` } });
        }
    }

    return lines;
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
                ret.push(feature);
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

                if ((feature.properties.pressure.value % 20) === 0) {
                    // 20hPa 毎の主線。元の feature を上書きする。
                    const isobar = { ...feature }
                    isobar.properties.type = '等圧線（主線）';
                    ret.push(isobar);

                } else if (feature.properties.pressure.value % 4) {
                    // 補助線。元の feature を破線で上書きする。

                    const lines = [];
                    for (let i = 0; i < (feature.geometry.coordinates.length - 1); i++) {
                        lines.push([feature.geometry.coordinates[i], feature.geometry.coordinates[i + 1]]);
                    }

                    const isobar = { ...feature }
                    isobar.properties.type = '等圧線（補助）';
                    isobar.geometry.type = 'MultiLineString';
                    isobar.geometry.coordinates = lines.filter((line, i) => (parseInt(i / AUXILIARY_ISOBAR_SPACE) % 2 === 0));
                    ret.push(isobar);

                } else {
                    ret.push(feature);
                }
                break;
        }
    }

    return ret;
}

// 高気圧・低気圧などの中心マークを返す。
export function getCenters(geojson) {
    const targets = ['台風', '低気圧', '高気圧', '熱帯低気圧', '低圧部'];
    return geojson.features.filter(x => targets.includes(x.properties.type));
}

// 悪天情報の強風を返す。
export function getStrongWinds(geojson) {
    const targets = ['悪天情報（強風）'];
    return geojson.features.filter(x => targets.includes(x.properties.type));
}

// 悪天情報の海氷・船体着氷を返す。
export function getIces(geojson) {
    const targets = ['悪天情報（海氷）', '悪天情報（船体着氷）'];
    return geojson.features.filter(x => targets.includes(x.properties.type));
}

// 悪天情報の霧を返す。
export function getFogs(geojson) {
    const targets = ['悪天情報（霧）'];
    return geojson.features.filter(x => targets.includes(x.properties.type));
}