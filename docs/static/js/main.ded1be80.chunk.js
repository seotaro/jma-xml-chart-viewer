(this["webpackJsonpjma-xml-chart-viewer"]=this["webpackJsonpjma-xml-chart-viewer"]||[]).push([[0],{148:function(e,t){},184:function(e,t,r){},185:function(e,t,r){},186:function(e,t,r){},189:function(e,t,r){},195:function(e,t){},199:function(e,t,r){"use strict";r.r(t);var n=r(1),i=r.n(n),o=r(32),a=r.n(o),c=(r(184),r(111)),s=r.n(c),p=r(46),l=r(143),u=r(109),h=(r(185),r(247)),d=r(250),f=r(254),g=r(168),y=r(167),j=r(256),b=r(144),m=function(){for(var e={type:"FeatureCollection",features:[]},t=180;-180<t;t-=10){for(var r=[],n=-80;n<=80;n+=1)r.push([t,n]);var i={type:"Feature",id:e.features.length,geometry:{type:"LineString",coordinates:r},properties:{},info:"".concat(Math.abs(t),"\xb0").concat(t<0?"W":"E")};e.features.push(i)}for(var o=-80;o<90;o+=10){for(var a=[],c=-180;c<=180;c+=1)a.push([c,o]);var s={type:"Feature",id:e.features.length,geometry:{type:"LineString",coordinates:a},properties:{},info:"".concat(Math.abs(o),"\xb0").concat(o<0?"S":"N")};e.features.push(s)}return e}();function S(e){var t,r=[],n=Object(b.a)(e.features);try{for(n.s();!(t=n.n()).done;){var i=t.value;switch(i.properties.type){case"\u5bd2\u51b7\u524d\u7dda":case"\u6e29\u6696\u524d\u7dda":case"\u9589\u585e\u524d\u7dda":var o=Object(p.a)({},i);o.info="".concat(i.properties.type),r.push(o);break;case"\u505c\u6ede\u524d\u7dda":for(var a=[],c=0;c<i.geometry.coordinates.length-1;c++)a.push([i.geometry.coordinates[c],i.geometry.coordinates[c+1]]);var s=Object(p.a)({},i),l=Object(p.a)({},i);l.properties=Object(p.a)({},i.properties),s.properties=Object(p.a)({},i.properties),l.geometry=Object(p.a)({},i.geometry),s.geometry=Object(p.a)({},i.geometry),l.properties.type="\u505c\u6ede\u524d\u7dda\uff08\u5947\u6570\uff09",s.properties.type="\u505c\u6ede\u524d\u7dda\uff08\u5076\u6570\uff09",l.geometry.type="MultiLineString",s.geometry.type="MultiLineString",l.geometry.coordinates=a.filter((function(e,t){return parseInt(t/20)%2===0})),s.geometry.coordinates=a.filter((function(e,t){return parseInt(t/20)%2!==0})),l.info="".concat(i.properties.type),s.info="".concat(i.properties.type),r.push(l),r.push(s)}}}catch(u){n.e(u)}finally{n.f()}return r}function v(e){var t,r=[],n=Object(b.a)(e.features);try{for(n.s();!(t=n.n()).done;){var i=t.value;switch(i.properties.type){case"\u7b49\u5727\u7dda":var o=Object(p.a)({},i);if(o.info="\u7b49\u5727\u7dda\uff08".concat(o.properties.pressure.value," ").concat(o.properties.pressure.unit,"\uff09"),o.properties.pressure.value%20===0)o.properties.type="\u7b49\u5727\u7dda\uff08\u4e3b\u7dda\uff09",r.push(o);else if(o.properties.pressure.value%4){for(var a=[],c=0;c<o.geometry.coordinates.length-1;c++)a.push([o.geometry.coordinates[c],o.geometry.coordinates[c+1]]);o.properties.type="\u7b49\u5727\u7dda\uff08\u88dc\u52a9\uff09",o.geometry.type="MultiLineString",o.geometry.coordinates=a.filter((function(e,t){return parseInt(t/10)%2===0})),r.push(o)}r.push(o)}}}catch(s){n.e(s)}finally{n.f()}return r}function x(e){var t=["\u53f0\u98a8","\u4f4e\u6c17\u5727","\u9ad8\u6c17\u5727","\u71b1\u5e2f\u4f4e\u6c17\u5727","\u4f4e\u5727\u90e8"];return e.features.filter((function(e){return t.includes(e.properties.type)})).map((function(e){var t=Object(p.a)({},e);return"\u53f0\u98a8"===t.properties.type?t.info="".concat(t.properties.type,"\uff08\n                                T").concat(t.properties.number," \n\u540d\u79f0 : ").concat(t.properties.nameKana," \n\u968e\u7d1a : ").concat(t.properties.class,"\n                                \u4e2d\u5fc3\u6c17\u5727 : ").concat(t.properties.pressure.value," ").concat(t.properties.pressure.unit," \n                                \u9032\u884c\u901f\u5ea6 : ").concat(t.properties.speed.value," ").concat(t.properties.speed.unit," \n                                \u9032\u884c\u65b9\u5411 : ").concat(t.properties.direction.value," ").concat(t.properties.direction.unit," \n                                \u98a8\u901f : ").concat(t.properties.windSpeed.value," ").concat(t.properties.windSpeed.unit,"\n\uff09"):t.info="".concat(t.properties.type,"\uff08\n                                \u4e2d\u5fc3\u6c17\u5727 : ").concat(t.properties.pressure.value," ").concat(t.properties.pressure.unit," \n                                \u9032\u884c\u901f\u5ea6 : ").concat(t.properties.speed.value," ").concat(t.properties.speed.unit," \n                                \u9032\u884c\u65b9\u5411 : ").concat(t.properties.direction.value," ").concat(t.properties.direction.unit," \n\uff09"),t}))}function O(e){var t=["\u60aa\u5929\u60c5\u5831\uff08\u5f37\u98a8\uff09"];return e.features.filter((function(e){return t.includes(e.properties.type)})).map((function(e){var t=Object(p.a)({},e);return t.info="".concat(t.properties.type,"\uff08").concat(t.properties.windSpeedKnot.value," ").concat(t.properties.windSpeedKnot.unit,"\uff09"),t}))}function k(e){var t=["\u60aa\u5929\u60c5\u5831\uff08\u6d77\u6c37\uff09","\u60aa\u5929\u60c5\u5831\uff08\u8239\u4f53\u7740\u6c37\uff09"];return e.features.filter((function(e){return t.includes(e.properties.type)})).map((function(e){var t=Object(p.a)({},e);return t.info="".concat(t.properties.type),t}))}function w(e){var t=["\u60aa\u5929\u60c5\u5831\uff08\u9727\uff09"];return e.features.filter((function(e){return t.includes(e.properties.type)})).map((function(e){var t=Object(p.a)({},e);return t.info="".concat(t.properties.type),t}))}var L={chartTypes:{VZSA50:{name:"\u5730\u4e0a\u5b9f\u6cc1\u56f3",code:"SPAS"},VZSA60:{name:"\u30a2\u30b8\u30a2\u592a\u5e73\u6d0b\u5730\u4e0a\u5b9f\u6cc1\u56f3",code:"ASAS"},VZSF50:{name:"\u5730\u4e0a24\u6642\u9593\u4e88\u60f3\u56f3",code:"FSAS24"},VZSF60:{name:"\u30a2\u30b8\u30a2\u592a\u5e73\u6d0b\u6d77\u4e0a\u60aa\u592924\u6642\u9593\u4e88\u60f3\u56f3",code:"FSAS24"},VZSF51:{name:"\u5730\u4e0a48\u6642\u9593\u4e88\u60f3\u56f3",code:"FSAS48"},VZSF61:{name:"\u30a2\u30b8\u30a2\u592a\u5e73\u6d0b\u6d77\u4e0a\u60aa\u592948\u6642\u9593\u4e88\u60f3\u56f3",code:"FSAS48"}},chart:{"\u7b49\u5727\u7dda":{color:[222,222,222],lineWidth:2,isStroke:!0},"\u7b49\u5727\u7dda\uff08\u4e3b\u7dda\uff09":{color:[222,222,222],lineWidth:4,isStroke:!0},"\u7b49\u5727\u7dda\uff08\u88dc\u52a9\uff09":{color:[222,222,222],lineWidth:2,isStroke:!0},"\u5bd2\u51b7\u524d\u7dda":{color:[32,32,255],lineWidth:4,isStroke:!0},"\u6e29\u6696\u524d\u7dda":{color:[255,32,32],lineWidth:4,isStroke:!0},"\u505c\u6ede\u524d\u7dda\uff08\u5947\u6570\uff09":{color:[255,32,32],lineWidth:4,isStroke:!0},"\u505c\u6ede\u524d\u7dda\uff08\u5076\u6570\uff09":{color:[32,32,255],lineWidth:4,isStroke:!0},"\u9589\u585e\u524d\u7dda":{color:[128,0,255],lineWidth:4,isStroke:!0},"\u53f0\u98a8":{text:"\u53f0",color:[255,32,32],iconSize:10,textSize:25},"\u9ad8\u6c17\u5727":{text:"\u9ad8",color:[32,32,255],iconSize:10,textSize:25},"\u4f4e\u6c17\u5727":{text:"\u4f4e",color:[255,32,32],iconSize:10,textSize:25},"\u71b1\u5e2f\u4f4e\u6c17\u5727":{text:"\u71b1",color:[255,32,32],iconSize:10,textSize:25},"\u4f4e\u5727\u90e8":{text:"\u4f4e",color:[255,32,32],iconSize:10,textSize:25},"\u60aa\u5929\u60c5\u5831\uff08\u5f37\u98a8\uff09":{color:[127,127,127],iconSize:25},"\u60aa\u5929\u60c5\u5831\uff08\u9727\uff09":{color:[255,255,128,127],isFill:!0},"\u60aa\u5929\u60c5\u5831\uff08\u6d77\u6c37\uff09":{color:[192,192,255,127],isFill:!0},"\u60aa\u5929\u60c5\u5831\uff08\u8239\u4f53\u7740\u6c37\uff09":{color:[192,192,255,127],isFill:!0}},initialViewState:{longitude:140,latitude:40,zoom:1.2},api:{jmaxml:"https://jma-xml-api-mrfbzypr4q-an.a.run.app",xml2geojson:"https://xml2geojson-api-mrfbzypr4q-an.a.run.app"},latlonLineLayer:{color:[127,127,127]},mapLayer:{color:[64,64,64],url:"https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson"},backgroundLayer:{color:[32,32,32]},windArrowLayer:{iconAtlas:"chart-wind-arrow.png",iconMapping:"chart-wind-arrow.json"},centerMarkLayer:{iconAtlas:"chart-center-mark.png",iconMapping:"chart-center-mark.json"},highlight:{color:[255,127,127,127]}},A=(r(186),r(145)),F=r.n(A),z=r(30);var C=function(e){return Object(z.jsxs)("article",{className:"ChartTitle",children:[Object(z.jsxs)("h1",{children:[e.title.title," ",e.title.code,"\uff08",e.title.type,"\uff09"]}),Object(z.jsxs)("p",{children:["basetime : ",F()(e.title.basetime).format()]}),Object(z.jsxs)("p",{children:["validtime : ",F()(e.title.validtime).format()]})]})},M=(r(189),r(257)),W=r(251),T=r(241),V=r(248);var I=function(e){var t=i.a.useState(Object.keys(e.types)[0]),r=Object(u.a)(t,2),n=r[0],o=r[1],a=Object.keys(e.types).map((function(e){return Object(z.jsx)(W.a,{value:e,children:e},e)}));return Object(z.jsx)("article",{className:"ChartTypeSelector",children:Object(z.jsxs)(T.a,{children:[Object(z.jsx)(M.a,{id:"chartselector-select-label",children:"jmaxml type"}),Object(z.jsx)(V.a,{labelId:"chartselector-select-label",value:n,onChange:function(t){return function(t){return o(t.target.value),e.handleChangeType(t.target.value)}(t)},children:a})]})})};var P=function(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),r=t[0],i=t[1],o=Object(n.useState)(Object.keys(L.chartTypes)[0]),a=Object(u.a)(o,2),c=a[0],b=a[1];Object(n.useEffect)((function(){Object(l.a)(s.a.mark((function e(){var t,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(L.api.jmaxml,"/").concat(c,"/latest.json"),e.next=3,fetch(t).then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then((function(e){return fetch("".concat(L.api.xml2geojson,"/?url=").concat(e[0].url))})).then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then((function(e){var t=Object(p.a)(Object(p.a)({},e.properties),{},{type:c,code:L.chartTypes[c].code}),r=v(e),n=S(e),i=k(e),o=w(e);return{fronts:n,isobars:r,title:t,windArrows:O(e),centerMarks:x(e),ices:i,fogs:o}})).catch((function(e){console.error("".concat(e))}));case 3:r=e.sent,i(r);case 5:case"end":return e.stop()}}),e)})))()}),[c]);var A=r&&Object(z.jsx)(C,{title:r.title}),F=r&&[{id:"chart-ice-layer",data:r.ices},{id:"chart-fog-layer",data:r.fogs},{id:"chart-isobar-layer",data:r.isobars},{id:"chart-front-layer",data:r.fronts}].map((function(e){return Object(z.jsx)(d.a,{id:e.id,data:e.data,stroked:function(e){return!!L.chart[e.properties.type].isStroke&&L.chart[e.properties.type].isStroke},filled:function(e){return!!L.chart[e.properties.type].isFill&&L.chart[e.properties.type].isFill},getFillColor:function(e){return L.chart[e.properties.type].color},getLineColor:function(e){return L.chart[e.properties.type].color},pointRadiusUnits:"pixels",pointRadiusScale:1,getRadius:function(e){return L.chart[e.properties.type].radius?L.chart[e.properties.type].radius:0},lineWidthUnits:"pixels",lineWidthScale:1,getLineWidth:function(e){return L.chart[e.properties.type].lineWidth?L.chart[e.properties.type].lineWidth:0},parameters:{cull:!0},pickable:!0,highlightColor:L.highlight.color,autoHighlight:!0})})),M=Object.keys(L.chart).map((function(e){return L.chart[e]})).filter((function(e){return e.text})).map((function(e){return e.text})),W=r&&Object(z.jsx)(f.a,{id:"chart-text-layer",data:r.centerMarks,getPosition:function(e){return e.geometry.coordinates},getSize:function(e){return L.chart[e.properties.type].textSize},getText:function(e){return L.chart[e.properties.type].text},characterSet:M,getTextAnchor:"middle",getAlignmentBaseline:"center",getColor:function(e){return L.chart[e.properties.type].color},billboard:!1,getAngle:function(e){return 180},getPixelOffset:[-20,-20]}),T=r&&Object(z.jsx)(g.a,{id:"chart-center-mark-layer",data:r.centerMarks,sizeUnits:"pixels",iconAtlas:L.centerMarkLayer.iconAtlas,iconMapping:L.centerMarkLayer.iconMapping,getIcon:function(e){return"center"},getPosition:function(e){return e.geometry.coordinates},getSize:function(e){return L.chart[e.properties.type].iconSize},getColor:function(e){return L.chart[e.properties.type].color},billboard:!1,pickable:!0,highlightColor:L.highlight.color,autoHighlight:!0}),V=r&&Object(z.jsx)(g.a,{id:"chart-wind-arrow-layer",data:r.windArrows,sizeUnits:"pixels",iconAtlas:L.windArrowLayer.iconAtlas,iconMapping:L.windArrowLayer.iconMapping,getIcon:function(e){return e.properties.windSpeedKnot.value},getPosition:function(e){return e.geometry.coordinates},getSize:function(e){return L.chart[e.properties.type].iconSize},getColor:function(e){return L.chart[e.properties.type].color},billboard:!1,getAngle:function(e){return 360-e.properties.windDegree.value},pickable:!0,highlightColor:L.highlight.color,autoHighlight:!0});return Object(z.jsxs)(n.Fragment,{children:[A,Object(z.jsx)(I,{types:L.chartTypes,handleChangeType:function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:b(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),Object(z.jsxs)(h.a,{initialViewState:L.initialViewState,controller:!0,getTooltip:function(e){var t=e.object;return t&&t.info},getCursor:function(e){return e.isHovering?"pointer":"grab"},children:[Object(z.jsx)(y.a,{id:"background-layer",data:[[[-180,90],[0,90],[180,90],[180,-90],[0,-90],[-180,-90]]],getPolygon:function(e){return e},filled:!0,getFillColor:L.backgroundLayer.color}),Object(z.jsx)(d.a,{id:"map-layer",data:L.mapLayer.url,filled:!0,getFillColor:L.mapLayer.color}),Object(z.jsx)(d.a,{id:"latlon-line-layer",data:m,stroked:!0,getLineColor:L.latlonLineLayer.color,lineWidthUnits:"pixels",lineWidthScale:1,getLineWidth:1,pickable:!0,highlightColor:L.highlight.color,autoHighlight:!0}),F,T,V,W,Object(z.jsx)(j.a,{id:"map",width:"100%",controller:!0,resolution:1})]})]})},Z=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,259)).then((function(t){var r=t.getCLS,n=t.getFID,i=t.getFCP,o=t.getLCP,a=t.getTTFB;r(e),n(e),i(e),o(e),a(e)}))};a.a.render(Object(z.jsx)(i.a.StrictMode,{children:Object(z.jsx)(P,{})}),document.getElementById("root")),Z()}},[[199,1,2]]]);