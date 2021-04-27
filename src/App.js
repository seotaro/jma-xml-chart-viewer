import './App.css';

import React, { useState, useEffect, Fragment } from 'react';
import {
  BrowserRouter as Router,
  useParams,
  useHistory
} from "react-router-dom";
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, SolidPolygonLayer, IconLayer } from '@deck.gl/layers';
import { _GlobeView as GlobeView, MapView } from '@deck.gl/core';
import { latlonlineGeoJson, getChartTimeline, getChart, } from './utils'
import { settings } from './settings'
import ChartTitle from './components/ChartTitle'
import ChartPanel from './components/ChartPanel'

function App() {
  const history = useHistory();

  const [chart, setChart] = useState(null); // 天気図オブジェクト
  const [chartTimeline, setTimeline] = useState(null); // タイムライン = 同種天気図の時系列リスト
  const [chartType, setChartType] = useState(Object.keys(settings.chartTypes)[0]);  // 表示する天気図種類
  const [chartIndex, setChartIndex] = useState(settings.timeline.count - 1);  // 表示するタイムラインのインデックス

  const [chartTitle, setChartTitle] = useState(null);
  const [chartLayers, setChartLayers] = useState({ geojson: null, centerIcon: null, windArrowsIcon: null });

  const params = useParams();
  if (params.chartType) {
    if (chartType !== params.chartType) {
      setChartType(params.chartType);
    }
  } else {
    const type = Object.keys(settings.chartTypes)[0]
    if (chartType !== type) {
      setChartType(type);
    }
  }

  useEffect(() => {
    (async () => {
      setTimeline(await getChartTimeline(chartType));
    })();
  }, [chartType]);

  useEffect(() => {
    (async () => {
      if (chartTimeline) {
        setChart(await getChart(chartTimeline, chartIndex, chartType));
      } else {
        setChart(null);
      }
    })();
  }, [chartTimeline, chartIndex]);

  useEffect(() => {
    (async () => {
      if (chart) {
        setChartTitle(<ChartTitle title={chart.title} />);

        const layers = {};

        layers.geojson = ([
          { id: `chart-ice-layer`, data: chart.ices },
          { id: `chart-fog-layer`, data: chart.fogs },
          { id: `chart-isobar-layer`, data: chart.isobars },
          { id: `chart-front-layer`, data: chart.fronts },
        ]).map(x => {
          return (<GeoJsonLayer id={x.id}
            key={x.id}
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
        });

        layers.centerIcon = ([
          {
            id: `chart-center-title-layer`,
            data: chart.centerMarks, angle: 180, offset: [-20, -60],
            iconAtlas: settings.centerTitleLayer.iconAtlas, iconMapping: settings.centerTitleLayer.iconMapping
          },
          {
            id: `chart-center-mark-layer`,
            data: chart.centerMarks, angle: 180, offset: [0, 0],
            iconAtlas: settings.centerMarkLayer.iconAtlas, iconMapping: settings.centerMarkLayer.iconMapping
          },
        ]).map(x => {
          return (< IconLayer id={x.id}
            key={x.id}
            data={x.data}
            sizeUnits={'pixels'}
            iconAtlas={x.iconAtlas}
            iconMapping={x.iconMapping}
            getIcon={d => d.properties.type}
            getPosition={d => d.geometry.coordinates}
            getSize={d => settings.chart[d.properties.type].iconSize}
            billboard={false}
            getAngle={180.0}
            getPixelOffset={x.offset}
            pickable={true}
            highlightColor={settings.highlight.color}
            autoHighlight={true}
          />)
        });

        layers.windArrowsIcon = (
          < IconLayer id='chart-wind-arrow-layer'
            data={chart.windArrows}
            sizeUnits={'pixels'}
            iconAtlas={settings.windArrowLayer.iconAtlas}
            iconMapping={settings.windArrowLayer.iconMapping}
            getIcon={d => d.properties.windSpeedKnot.value}
            getPosition={d => d.geometry.coordinates}
            getSize={d => settings.chart[d.properties.type].iconSize}
            billboard={false}
            getAngle={d => 360.0 - d.properties.windDegree.value}
            pickable={true}
            highlightColor={settings.highlight.color}
            autoHighlight={true}
          />
        );

        setChartLayers(layers);
      }
    })();
  }, [chart]);


  return (
    <Fragment>
      {chartTitle}

      <ChartPanel
        type={chartType}
        timeline={chartTimeline}
        index={chartIndex}
        handleChangeType={(async (type) => { setChartType(type); history.push(type); })}
        handleChangeIndex={(async (index) => { setChartIndex(index); })} />

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

        {chartLayers.windArrowsIcon}
        {chartLayers.geojson}
        {chartLayers.centerIcon}

        <GlobeView id="map" width="100%" controller={true} resolution={1} />
      </DeckGL>
    </Fragment >
  );
}

export default App;
