import './App.css';

import React, { useState, useEffect, Fragment } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, SolidPolygonLayer, LineLayer, TextLayer, IconLayer } from '@deck.gl/layers';
import { _GlobeView as GlobeView, MapView } from '@deck.gl/core';
import { getFronts, getIsobars, getStrongWinds, getCenters, getIces, getFogs, latlonlineGeoJson } from './utils'
import { settings } from './settings'
import ChartTitle from './components/ChartTitle'
import ChartTypeSelector from './components/ChartTypeSelector'

function App() {
  const [chart, setChart] = useState(null);
  const [chartType, setChartType] = useState(Object.keys(settings.chartTypes)[0]);

  useEffect(() => {
    (async () => {
      const LATEST_URL = `${settings.api.jmaxml}/${chartType}/latest.json`;

      const chart = await fetch(LATEST_URL)
        .then(res => {
          return res.text();
        })
        .then(text => {
          return JSON.parse(text);
        })
        .then(latest => {
          return fetch(`${settings.api.xml2geojson}/?url=${latest[0].url}`)
        })
        .then(res => {
          return res.text();
        })
        .then(text => {
          return JSON.parse(text);
        })
        .then(geojson => {
          // 要素毎にレイヤーに分ける。
          const title = { ...geojson.properties, type: chartType, code: settings.chartTypes[chartType].code };
          const isobars = getIsobars(geojson);
          const fronts = getFronts(geojson);
          const ices = getIces(geojson);
          const fogs = getFogs(geojson);
          const windArrows = getStrongWinds(geojson);
          const centerMarks = getCenters(geojson);
          return { fronts: fronts, isobars: isobars, title: title, windArrows: windArrows, centerMarks: centerMarks, ices: ices, fogs: fogs };
        })
        .catch((err) => {
          console.error(`${err}`);
        });

      setChart(chart);
    })();
  }, [chartType]);


  const chartTitle = chart && (<ChartTitle title={chart.title} />);

  const chartGeoJsonLayers = chart && ([
    { id: `chart-ice-layer`, data: chart.ices },
    { id: `chart-fog-layer`, data: chart.fogs },
    { id: `chart-isobar-layer`, data: chart.isobars },
    { id: `chart-front-layer`, data: chart.fronts },
  ]).map(x => {
    return (<GeoJsonLayer id={x.id}
      data={x.data}
      stroked={d => settings.chart[d.properties.type].isStroke ? settings.chart[d.properties.type].isStroke : false}
      filled={d => settings.chart[d.properties.type].isFill ? settings.chart[d.properties.type].isFill : false}
      getFillColor={d => settings.chart[d.properties.type].color}
      getLineColor={d => settings.chart[d.properties.type].color}
      pointRadiusUnits={'pixels'}
      pointRadiusScale={1}
      getRadius={d => settings.chart[d.properties.type].radius ? settings.chart[d.properties.type].radius : 0}
      lineWidthUnits={'pixels'}
      lineWidthScale={1}
      getLineWidth={d => settings.chart[d.properties.type].lineWidth ? settings.chart[d.properties.type].lineWidth : 0}
      parameters={{ cull: true }}

      pickable={true}
      highlightColor={settings.highlight.color}
      autoHighlight={true}
    />)
  })


  const characterSet = Object.keys(settings.chart).map(k => settings.chart[k]).filter(x => x.text).map(x => x.text);
  const chartTextLayers = chart && (
    <TextLayer id={`chart-text-layer`}
      data={chart.centerMarks}
      getPosition={d => d.geometry.coordinates}
      getSize={d => settings.chart[d.properties.type].textSize}
      getText={d => settings.chart[d.properties.type].text}
      characterSet={characterSet}
      getTextAnchor={'middle'}
      getAlignmentBaseline={'center'}
      getColor={d => settings.chart[d.properties.type].color}
      billboard={false}
      getAngle={d => 180.0}
      getPixelOffset={[-20, -20]}
    />
  );

  const centerMarks = chart && (
    < IconLayer id='chart-center-mark-layer'
      data={chart.centerMarks}
      sizeUnits={'pixels'}
      iconAtlas={settings.centerMarkLayer.iconAtlas}
      iconMapping={settings.centerMarkLayer.iconMapping}
      getIcon={d => 'center'}
      getPosition={d => d.geometry.coordinates}
      getSize={d => settings.chart[d.properties.type].iconSize}
      getColor={d => settings.chart[d.properties.type].color}
      billboard={false}

      pickable={true}
      highlightColor={settings.highlight.color}
      autoHighlight={true}
    />
  );

  const windArrows = chart && (
    < IconLayer id='chart-wind-arrow-layer'
      data={chart.windArrows}
      sizeUnits={'pixels'}
      iconAtlas={settings.windArrowLayer.iconAtlas}
      iconMapping={settings.windArrowLayer.iconMapping}
      getIcon={d => d.properties.windSpeedKnot.value}
      getPosition={d => d.geometry.coordinates}
      getSize={d => settings.chart[d.properties.type].iconSize}
      getColor={d => settings.chart[d.properties.type].color}
      billboard={false}
      getAngle={d => 360.0 - d.properties.windDegree.value}

      pickable={true}
      highlightColor={settings.highlight.color}
      autoHighlight={true}
    />
  );

  return (
    <Fragment>
      {chartTitle}

      <ChartTypeSelector
        types={settings.chartTypes}
        handleChangeType={(async (type) => { setChartType(type); })} />

      <DeckGL
        initialViewState={settings.initialViewState}
        controller={true}
        getTooltip={({ object }) => object && object.info}
        getCursor={({ isHovering }) => isHovering ? 'pointer' : 'grab'}
      >

        <SolidPolygonLayer id='background-layer'
          data={[[[-180, 90], [0, 90], [180, 90], [180, -90], [0, -90], [-180, -90]]]}
          getPolygon={d => d}
          filled={true}
          getFillColor={settings.backgroundLayer.color}
        />

        <GeoJsonLayer id="map-layer"
          data={settings.mapLayer.url}
          filled={true}
          getFillColor={settings.mapLayer.color}
        />

        <GeoJsonLayer id="latlon-line-layer"
          data={latlonlineGeoJson}
          stroked={true}
          getLineColor={settings.latlonLineLayer.color}
          lineWidthUnits={'pixels'}
          lineWidthScale={1}
          getLineWidth={1}

          pickable={true}
          highlightColor={settings.highlight.color}
          autoHighlight={true}
        />

        {chartGeoJsonLayers}
        {centerMarks}
        {windArrows}
        {chartTextLayers}

        <GlobeView id="map" width="100%" controller={true} resolution={1} />
      </DeckGL>
    </Fragment >
  );
}

export default App;
