import './App.css';

import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, SolidPolygonLayer, LineLayer, TextLayer } from '@deck.gl/layers';
import { _GlobeView as GlobeView } from '@deck.gl/core';
import { latlonline, modifyChartGeojson, createChartTexts } from './utils'
import { settings } from './settings'



// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 140.0,
  latitude: 40.0,
  zoom: 1.2,
};

const MAP = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson';

const chartGeoJson = 'https://xml2chart-api-mrfbzypr4q-an.a.run.app/?url=https://storage.googleapis.com/jma-xml-files/20210416142531_0_VZSA60_010000.xml';



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


  const characterSet = Object.keys(settings).map(k => settings[k]).filter(x => x.text).map(x => x.text);
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
      getPixelOffset={[20, 20]}
      getPolygonOffset={({ layerIndex }) => [0, -90000]}
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
