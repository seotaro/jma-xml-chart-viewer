
export const settings = {
    chartTypes: {
        'VZSA50': { name: '地上実況図', code: 'SPAS' },
        'VZSA60': { name: 'アジア太平洋地上実況図', code: 'ASAS' },
        'VZSF50': { name: '地上24時間予想図', code: 'FSAS24' },
        'VZSF60': { name: 'アジア太平洋海上悪天24時間予想図', code: 'FSAS24' },
        'VZSF51': { name: '地上48時間予想図', code: 'FSAS48' },
        'VZSF61': { name: 'アジア太平洋海上悪天48時間予想図', code: 'FSAS48' },
    },
    chart: {
        '等圧線': { color: [222, 222, 222], lineWidth: 2, isStroke: true },
        '等圧線（主線）': { color: [222, 222, 222], lineWidth: 4, isStroke: true },
        '等圧線（補助）': { color: [222, 222, 222], lineWidth: 2, isStroke: true, },
        '寒冷前線': { color: [32, 32, 255], lineWidth: 4, isStroke: true },
        '温暖前線': { color: [255, 32, 32], lineWidth: 4, isStroke: true },
        '停滞前線（奇数）': { color: [255, 32, 32], lineWidth: 4, isStroke: true },
        '停滞前線（偶数）': { color: [32, 32, 255], lineWidth: 4, isStroke: true },
        '閉塞前線': { color: [128, 0, 255], lineWidth: 4, isStroke: true },
        '台風': { text: '台', color: [255, 32, 32], iconSize: 10, textSize: 25 },
        '高気圧': { text: '高', color: [32, 32, 255], iconSize: 10, textSize: 25 },
        '低気圧': { text: '低', color: [255, 32, 32], iconSize: 10, textSize: 25 },
        '熱帯低気圧': { text: '熱', color: [255, 32, 32], iconSize: 10, textSize: 25 },
        '低圧部': { text: '低', color: [255, 32, 32], iconSize: 10, textSize: 25 },
        '悪天情報（強風）': { color: [127, 127, 127], iconSize: 25 },
        '悪天情報（霧）': { color: [255, 255, 128, 127], isFill: true },
        '悪天情報（海氷）': { color: [192, 192, 255, 127], isFill: true },
        '悪天情報（船体着氷）': { color: [192, 192, 255, 127], isFill: true },
    },
    initialViewState: {
        longitude: 140.0,
        latitude: 40.0,
        zoom: 1.2,
    },
    api: {
        jmaxml: 'https://jma-xml-api-mrfbzypr4q-an.a.run.app',
        xml2geojson: 'https://xml2geojson-api-mrfbzypr4q-an.a.run.app',
    },
    latlonLineLayer: {
        color: [127, 127, 127]
    },
    mapLayer: {
        color: [64, 64, 64],
        url: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson'
    },
    backgroundLayer: {
        color: [32, 32, 32]
    },
    windArrowLayer: {
        iconAtlas: 'chart-wind-arrow.png',
        iconMapping: 'chart-wind-arrow.json'
    },
    centerMarkLayer: {
        iconAtlas: 'chart-center-mark.png',
        iconMapping: 'chart-center-mark.json'
    },
    highlight: {
        color: [255, 127, 127, 127]
    }

};
