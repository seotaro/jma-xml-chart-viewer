import './App.css';

import React, { useState, useEffect, Fragment } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, SolidPolygonLayer, LineLayer, TextLayer, IconLayer } from '@deck.gl/layers';
import { _GlobeView as GlobeView } from '@deck.gl/core';
import { latlonline, modifyChartGeojson, createChartTexts, createWindArrows } from './utils'
import { settings } from './settings'
import ChartTitle from './components/ChartTitle'
import ChartTypeSelector from './components/ChartTypeSelector'



// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 140.0,
  latitude: 40.0,
  zoom: 1.2,
};

const MAP_URL = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson';

const chartTypes = {
  'VZSA50': { name: '地上実況図', code: 'SPAS' },
  'VZSA60': { name: 'アジア太平洋地上実況図', code: 'ASAS' },
  'VZSF50': { name: '地上24時間予想図', code: 'FSAS24' },
  'VZSF60': { name: 'アジア太平洋海上悪天24時間予想図', code: 'FSAS24' },
  'VZSF51': { name: '地上48時間予想図', code: 'FSAS48' },
  'VZSF61': { name: 'アジア太平洋海上悪天48時間予想図', code: 'FSAS48' },
};

function App() {
  const [chart, setChart] = useState(null);
  const [chartType, setChartType] = useState(Object.keys(chartTypes)[0]);

  useEffect(() => {
    (async () => {

      const LATEST_URL = `https://jma-xml-api-mrfbzypr4q-an.a.run.app/${chartType}/latest.json`;

      const chart = await fetch(LATEST_URL)
        .then(res => {
          return res.text();
        })
        .then(text => {
          return JSON.parse(text);
        })
        .then(latest => {
          return fetch(`https://xml2chart-api-mrfbzypr4q-an.a.run.app/?url=${latest[0].url}`)
        })
        .then(res => {
          return res.text();
        })
        .then(text => {
          return JSON.parse(text);
        })
        .then(geojson => {
          // レンダリングに必要な情報を補足する。
          geojson = modifyChartGeojson(geojson);
          const texts = createChartTexts(geojson);
          const title = { ...geojson.properties, type: chartType, code: chartTypes[chartType].code };
          const windArrows = createWindArrows(geojson);
          return { geojson: geojson, texts: texts, title: title, windArrows: windArrows };
        })
        .catch((err) => {
          console.error(`${err}`);
        });

      setChart(chart);
    })();
  }, [chartType]);

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
      characterSet={characterSet}
      getTextAnchor={'middle'}
      sizeScale={1}
      getColor={d => settings[d.type].color}
      getPixelOffset={[20, 20]}
      getPolygonOffset={({ layerIndex }) => [0, -90000]}
    />
  );

  const handleChangeChartType = async (type) => {
    setChartType(type);
  };

  const chartTitle = chart && (<ChartTitle title={chart.title} />);

  const windArrows = chart && (< IconLayer id='chart-arrow-layer'
    data={chart.windArrows}
    sizeUnits={'pixels'}

    iconAtlas={'chart-wind-arrow.png'}
    iconMapping={'chart-wind-arrow.json'}
    getIcon={d => d.speedKnot}
    getPosition={d => d.coordinates}
    getSize={d => 50}
    alphaCutoff={.5}
    billboard={false}
    getAngle={d => 360.0 - d.angle}
    getPolygonOffset={({ layerIndex }) => [0, -10000]}
  />);

  return (
    <Fragment>
      {chartTitle}
      <ChartTypeSelector types={chartTypes} handleChangeType={handleChangeChartType} />
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        {windArrows}
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
          data={MAP_URL}

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
    </Fragment>
  );
}

export default App;
