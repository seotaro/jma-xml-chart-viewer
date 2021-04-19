import './App.css';

import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, SolidPolygonLayer, LineLayer, TextLayer } from '@deck.gl/layers';
import { _GlobeView as GlobeView } from '@deck.gl/core';



// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 140.0,
  latitude: 35.0,
  zoom: 1,
};

const MAP = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson';

const chartGeoJson = 'https://xml2chart-api-mrfbzypr4q-an.a.run.app/?url=https://storage.googleapis.com/jma-xml-files/20210416142531_0_VZSA60_010000.xml';

const settings = {
  '等圧線': { color: [222, 222, 222], lineWidth: 2, isStroke: true },
  '等圧線（主線）': { color: [222, 222, 222], lineWidth: 4, isStroke: true },
  '等圧線（補助）': { color: [222, 222, 222], lineWidth: 2, isStroke: true, },
  '寒冷前線': { color: [64, 64, 255], lineWidth: 4, isStroke: true },
  '温暖前線': { color: [255, 64, 64], lineWidth: 4, isStroke: true },
  '停滞前線（奇数）': { color: [255, 64, 64], lineWidth: 4, isStroke: true },
  '停滞前線（偶数）': { color: [64, 64, 255], lineWidth: 4, isStroke: true },
  '閉塞前線': { color: [128, 0, 255], lineWidth: 4, isStroke: true },
  '台風': { color: [255, 0, 0], },
  '低気圧': { color: [0, 0, 255], },
  '高気圧': { color: [255, 0, 0], },
  '熱帯低気圧': { color: [255, 0, 0], },
  '低圧部': { color: [255, 0, 0], },
  '悪天情報（強風）': { color: [255, 0, 0], radius: 4, isFill: true },
  '悪天情報（霧）': { color: [255, 0, 255, 64], lineWidth: 4, isFill: true },
  '悪天情報（海氷）': { color: [192, 192, 255, 127], isFill: true },
};

// LineLayer の緯線経線データ
const latlonline = (() => {
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
function modifyChartGeojson(geojson) {
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

function createChartTexts(chart) {
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
        const offset = [0.0, -4.0];
        const coordinate = feature.geometry.coordinates.map((x, i) => (x + offset[i]));
        texts.push({ title: title, type: feature.properties.type, coordinates: coordinate });
        break;
    }
  }
  return texts;
}


function App() {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    (async () => {
      const chart = await fetch(chartGeoJson)
        .then((res) => {
          return res.text();
        })
        .then((text) => {
          return JSON.parse(text);
        })
        .then((geojson) => {
          // レンダリングに必要な情報を補足する。
          geojson = modifyChartGeojson(geojson);
          const texts = createChartTexts(geojson);
          return { geojson: geojson, texts: texts };
        })
        .catch((err) => {
          console.error(`load error ${chartGeoJson} : ${err}`);
        });

      setChart(chart);
    })();
  }, []);


  const chartLayers = chart && (
    <GeoJsonLayer id={`chart-shape-layer`}
      data={chart.geojson}

      stroked={d => settings[d.properties.type].isStroke ? settings[d.properties.type].isStroke : false}
      filled={d => settings[d.properties.type].isFill ? settings[d.properties.type].isFill : false}

      getFillColor={d => settings[d.properties.type].color}
      getLineColor={d => settings[d.properties.type].color}

      pointRadiusUnits={'pixels'}
      pointRadiusScale={1}
      getRadius={d => settings[d.properties.type].radius ? settings[d.properties.type].radius : 0}

      lineWidthUnits={'pixels'}
      lineWidthScale={1}
      getLineWidth={d => settings[d.properties.type].lineWidth ? settings[d.properties.type].lineWidth : 0}

      parameters={{ depthTest: true, cull: true }}
      getPolygonOffset={({ layerIndex }) => [0, -20000]}
    />
  );

  const chartTextLayers = chart && (
    <TextLayer id={`chart-text-layer`}
      data={chart.texts}
      getAlignmentBaseline={'center'}
      getAngle={0}
      getPosition={d => d.coordinates}
      getSize={32}
      getText={d => d.title}
      characterSet={['台', '低', '高', '熱', '風']}
      getTextAnchor={'middle'}
      sizeScale={1}
      getColor={d => settings[d.type].color}

      getPolygonOffset={({ layerIndex }) => [0, -30000]}
    />
  );

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
    >

      {chartLayers}
      {chartTextLayers}

      < LineLayer id='latlon-line-layer'
        data={latlonline}

        getSourcePosition={d => d.start}
        getTargetPosition={d => d.end}

        getColor={[127, 127, 127]}
        getWidth={1}

        getPolygonOffset={({ layerIndex }) => [0, -10000]}
      />

      <GeoJsonLayer id="map-layer"
        data={MAP}

        filled={true}

        getFillColor={[64, 64, 64]}

        parameters={{ depthTest: true, cull: true }}
        getPolygonOffset={({ layerIndex }) => [0, -10000]}
      />

      <SolidPolygonLayer id='background'
        data={[[[-180, 90], [0, 90], [180, 90], [180, -90], [0, -90], [-180, -90]]]}
        getPolygon={d => d}

        filled={true}
        getFillColor={[32, 32, 32]}

        parameters={{ depthTest: true, cull: true }}
        getPolygonOffset={({ layerIndex }) => [0, 10000]}
      />

      <GlobeView id="map" width="100%" controller={true} />
    </DeckGL>
  );
}

export default App;
