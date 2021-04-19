// LineLayer の緯線経線データ
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

// レンダリングに必要な情報を補足する。
export function modifyChartGeojson(geojson) {
    const AUXILIARY_ISOBAR_SPACE = 10;  // 等圧線の補助線の破線間隔
    const STATIONARY_FRONT_SPACE = 20;  // 停滞前線の奇数偶数区間の間隔

    const addFeatures = [];
    const deleteFeatures = [];
    for (const feature of geojson.features) {
        switch (feature.properties.type) {
            case '等圧線':
                if ((feature.properties.pressure.value % 20) === 0) {
                    // 20hPa 毎の主線。元の feature を上書きする。
                    feature.properties.type = '等圧線（主線）';

                } else if (feature.properties.pressure.value % 4) {
                    // 補助線。元の feature を破線で上書きする。

                    const lines = [];
                    for (let i = 0; i < (feature.geometry.coordinates.length - 1); i++) {
                        lines.push([feature.geometry.coordinates[i], feature.geometry.coordinates[i + 1]]);
                    }

                    feature.properties.type = '等圧線（補助）';
                    feature.geometry.type = 'MultiLineString';
                    feature.geometry.coordinates = lines.filter((line, i) => (parseInt(i / AUXILIARY_ISOBAR_SPACE) % 2 === 0));
                }
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

                    addFeatures.push(odd);
                    addFeatures.push(even);

                    deleteFeatures.push(feature);
                }
                break;
        }
    }

    geojson.features = geojson.features.filter(feature => !deleteFeatures.includes(feature));

    for (const feature of addFeatures) {
        geojson.features.push(feature);
    }

    return geojson;
}

export function createChartTexts(chart) {
    const texts = [];
    for (const feature of chart.features) {

        let title = '';
        switch (feature.properties.type) {
            case '台風':
                title = '台';
                break;
            case '低気圧':
                title = '低';
                break;
            case '高気圧':
                title = '高';
                break;
            case '熱帯低気圧':
                title = '熱';
                break;
            case '低圧部':
                title = '低';
                break;
        }

        switch (feature.properties.type) {
            case '台風':
            case '低気圧':
            case '高気圧':
            case '熱帯低気圧':
            case '低圧部':
                texts.push({ title: title, type: feature.properties.type, coordinates: feature.geometry.coordinates });
                break;
        }
    }
    return texts;
}
