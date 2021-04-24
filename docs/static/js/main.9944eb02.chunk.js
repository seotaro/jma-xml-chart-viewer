(this["webpackJsonpjma-xml-chart-viewer"]=this["webpackJsonpjma-xml-chart-viewer"]||[]).push([[0],{156:function(e,t){},197:function(e,t,r){},198:function(e,t,r){},206:function(e,t){},210:function(e,t,r){"use strict";r.r(t);var n=r(1),i=r.n(n),a=r(33),o=r.n(a),c=(r(197),r(49)),s=r.n(c),p=r(74),l=r(94),u=(r(198),r(260)),d=r(264),h=r(268),f=r(176),g=r(270),y=r(50),b=r(153),m={chartTypes:{VZSA50:{name:"\u5730\u4e0a\u5b9f\u6cc1\u56f3",code:"SPAS"},VZSA60:{name:"\u30a2\u30b8\u30a2\u592a\u5e73\u6d0b\u5730\u4e0a\u5b9f\u6cc1\u56f3",code:"ASAS"},VZSF50:{name:"\u5730\u4e0a24\u6642\u9593\u4e88\u60f3\u56f3",code:"FSAS24"},VZSF60:{name:"\u30a2\u30b8\u30a2\u592a\u5e73\u6d0b\u6d77\u4e0a\u60aa\u592924\u6642\u9593\u4e88\u60f3\u56f3",code:"FSAS24"},VZSF51:{name:"\u5730\u4e0a48\u6642\u9593\u4e88\u60f3\u56f3",code:"FSAS48"},VZSF61:{name:"\u30a2\u30b8\u30a2\u592a\u5e73\u6d0b\u6d77\u4e0a\u60aa\u592948\u6642\u9593\u4e88\u60f3\u56f3",code:"FSAS48"}},chart:{"\u7b49\u5727\u7dda":{color:[222,222,222],lineWidth:2,isStroke:!0},"\u7b49\u5727\u7dda\uff08\u4e3b\u7dda\uff09":{color:[222,222,222],lineWidth:4,isStroke:!0},"\u7b49\u5727\u7dda\uff08\u88dc\u52a9\uff09":{color:[222,222,222],lineWidth:2,isStroke:!0},"\u5bd2\u51b7\u524d\u7dda":{color:[32,32,255],lineWidth:4,isStroke:!0},"\u6e29\u6696\u524d\u7dda":{color:[255,32,32],lineWidth:4,isStroke:!0},"\u505c\u6ede\u524d\u7dda\uff08\u5947\u6570\uff09":{color:[255,32,32],lineWidth:4,isStroke:!0},"\u505c\u6ede\u524d\u7dda\uff08\u5076\u6570\uff09":{color:[32,32,255],lineWidth:4,isStroke:!0},"\u9589\u585e\u524d\u7dda":{color:[128,0,255],lineWidth:4,isStroke:!0},"\u53f0\u98a8":{iconSize:40},"\u9ad8\u6c17\u5727":{iconSize:40},"\u4f4e\u6c17\u5727":{iconSize:40},"\u71b1\u5e2f\u4f4e\u6c17\u5727":{iconSize:40},"\u4f4e\u5727\u90e8":{iconSize:40},"\u60aa\u5929\u60c5\u5831\uff08\u5f37\u98a8\uff09":{iconSize:40},"\u60aa\u5929\u60c5\u5831\uff08\u9727\uff09":{color:[255,255,128,127],isFill:!0},"\u60aa\u5929\u60c5\u5831\uff08\u6d77\u6c37\uff09":{color:[192,192,255,127],isFill:!0},"\u60aa\u5929\u60c5\u5831\uff08\u8239\u4f53\u7740\u6c37\uff09":{color:[192,192,255,127],isFill:!0}},initialViewState:{longitude:140,latitude:40,zoom:1.2},api:{jmaxml:"https://jma-xml-api-mrfbzypr4q-an.a.run.app",xml2geojson:"https://xml2geojson-api-mrfbzypr4q-an.a.run.app"},latlonLineLayer:{color:[127,127,127]},mapLayer:{color:[64,64,64],url:"https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson"},backgroundLayer:{color:[32,32,32]},windArrowLayer:{iconAtlas:"chart-wind-arrow.png",iconMapping:"chart-wind-arrow.json"},centerMarkLayer:{iconAtlas:"chart-center-mark.png",iconMapping:"chart-center-mark.json"},centerTitleLayer:{iconAtlas:"chart-center-title.png",iconMapping:"chart-center-title.json"},highlight:{color:[255,127,127,127]},timeline:{count:10}};function j(e){return v.apply(this,arguments)}function v(){return(v=Object(p.a)(s.a.mark((function e(t){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="".concat(m.api.jmaxml,"/").concat(t,"?count=").concat(m.timeline.count),e.abrupt("return",fetch(r).then((function(e){return e.text()})).then((function(e){return JSON.parse(e,(function(e,t){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(t)?new Date(t):t}))})).then((function(e){return e.sort((function(e,t){var r=e.datetime.getTime(),n=t.datetime.getTime();return r<n?-1:n<r?1:0}))})).catch((function(e){console.error("".concat(e))})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e,t,r){return x.apply(this,arguments)}function x(){return(x=Object(p.a)(s.a.mark((function e(t,r,n){var i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i="".concat(m.api.xml2geojson,"/?url=").concat(t[r].url),e.abrupt("return",fetch(i).then((function(e){return e.text()})).then((function(e){return JSON.parse(e,(function(e,t){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(t)?new Date(t):t}))})).then((function(e){var t=Object(y.a)(Object(y.a)({},e.properties),{},{type:n,code:m.chartTypes[n].code}),r=w(e),i=k(e),a=F(e),o=M(e);return{fronts:i,isobars:r,title:t,windArrows:A(e),centerMarks:L(e),ices:a,fogs:o}})).catch((function(e){console.error("".concat(e))})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var S=function(){for(var e={type:"FeatureCollection",features:[]},t=180;-180<t;t-=10){for(var r=[],n=-80;n<=80;n+=1)r.push([t,n]);var i={type:"Feature",id:e.features.length,geometry:{type:"LineString",coordinates:r},properties:{},info:"".concat(Math.abs(t),"\xb0").concat(t<0?"W":"E")};e.features.push(i)}for(var a=-80;a<90;a+=10){for(var o=[],c=-180;c<=180;c+=1)o.push([c,a]);var s={type:"Feature",id:e.features.length,geometry:{type:"LineString",coordinates:o},properties:{},info:"".concat(Math.abs(a),"\xb0").concat(a<0?"S":"N")};e.features.push(s)}return e}();function k(e){var t,r=[],n=Object(b.a)(e.features);try{for(n.s();!(t=n.n()).done;){var i=t.value;switch(i.properties.type){case"\u5bd2\u51b7\u524d\u7dda":case"\u6e29\u6696\u524d\u7dda":case"\u9589\u585e\u524d\u7dda":var a=Object(y.a)({},i);a.info="".concat(i.properties.type),r.push(a);break;case"\u505c\u6ede\u524d\u7dda":for(var o=[],c=0;c<i.geometry.coordinates.length-1;c++)o.push([i.geometry.coordinates[c],i.geometry.coordinates[c+1]]);var s=Object(y.a)({},i),p=Object(y.a)({},i);p.properties=Object(y.a)({},i.properties),s.properties=Object(y.a)({},i.properties),p.geometry=Object(y.a)({},i.geometry),s.geometry=Object(y.a)({},i.geometry),p.properties.type="\u505c\u6ede\u524d\u7dda\uff08\u5947\u6570\uff09",s.properties.type="\u505c\u6ede\u524d\u7dda\uff08\u5076\u6570\uff09",p.geometry.type="MultiLineString",s.geometry.type="MultiLineString",p.geometry.coordinates=o.filter((function(e,t){return parseInt(t/20)%2===0})),s.geometry.coordinates=o.filter((function(e,t){return parseInt(t/20)%2!==0})),p.info="".concat(i.properties.type),s.info="".concat(i.properties.type),r.push(p),r.push(s)}}}catch(l){n.e(l)}finally{n.f()}return r}function w(e){var t,r=[],n=Object(b.a)(e.features);try{for(n.s();!(t=n.n()).done;){var i=t.value;switch(i.properties.type){case"\u7b49\u5727\u7dda":var a=Object(y.a)({},i);if(a.info="\u7b49\u5727\u7dda\uff08".concat(a.properties.pressure.value," ").concat(a.properties.pressure.unit,"\uff09"),a.properties.pressure.value%20===0)a.properties.type="\u7b49\u5727\u7dda\uff08\u4e3b\u7dda\uff09",r.push(a);else if(a.properties.pressure.value%4){for(var o=[],c=0;c<a.geometry.coordinates.length-1;c++)o.push([a.geometry.coordinates[c],a.geometry.coordinates[c+1]]);a.properties.type="\u7b49\u5727\u7dda\uff08\u88dc\u52a9\uff09",a.geometry.type="MultiLineString",a.geometry.coordinates=o.filter((function(e,t){return parseInt(t/10)%2===0})),r.push(a)}r.push(a)}}}catch(s){n.e(s)}finally{n.f()}return r}function L(e){var t=["\u53f0\u98a8","\u4f4e\u6c17\u5727","\u9ad8\u6c17\u5727","\u71b1\u5e2f\u4f4e\u6c17\u5727","\u4f4e\u5727\u90e8"];return e.features.filter((function(e){return t.includes(e.properties.type)})).map((function(e){var t=Object(y.a)({},e);return"\u53f0\u98a8"===t.properties.type?t.info="".concat(t.properties.type,"\uff08\n                                T").concat(t.properties.number," \n\u540d\u79f0 : ").concat(t.properties.nameKana," \n\u968e\u7d1a : ").concat(t.properties.class,"\n                                \u4e2d\u5fc3\u6c17\u5727 : ").concat(t.properties.pressure.value," ").concat(t.properties.pressure.unit," \n                                \u9032\u884c\u901f\u5ea6 : ").concat(t.properties.speed.value," ").concat(t.properties.speed.unit," \n                                \u9032\u884c\u65b9\u5411 : ").concat(t.properties.direction.value," ").concat(t.properties.direction.unit," \n                                \u98a8\u901f : ").concat(t.properties.windSpeed.value," ").concat(t.properties.windSpeed.unit,"\n\uff09"):t.info="".concat(t.properties.type,"\uff08\n                                \u4e2d\u5fc3\u6c17\u5727 : ").concat(t.properties.pressure.value," ").concat(t.properties.pressure.unit," \n                                \u9032\u884c\u901f\u5ea6 : ").concat(t.properties.speed.value," ").concat(t.properties.speed.unit," \n                                \u9032\u884c\u65b9\u5411 : ").concat(t.properties.direction.value," ").concat(t.properties.direction.unit," \n\uff09"),t}))}function A(e){var t=["\u60aa\u5929\u60c5\u5831\uff08\u5f37\u98a8\uff09"];return e.features.filter((function(e){return t.includes(e.properties.type)})).map((function(e){var t=Object(y.a)({},e);return t.info="".concat(t.properties.type,"\uff08").concat(t.properties.windSpeedKnot.value," ").concat(t.properties.windSpeedKnot.unit,"\uff09"),t}))}function F(e){var t=["\u60aa\u5929\u60c5\u5831\uff08\u6d77\u6c37\uff09","\u60aa\u5929\u60c5\u5831\uff08\u8239\u4f53\u7740\u6c37\uff09"];return e.features.filter((function(e){return t.includes(e.properties.type)})).map((function(e){var t=Object(y.a)({},e);return t.info="".concat(t.properties.type),t}))}function M(e){var t=["\u60aa\u5929\u60c5\u5831\uff08\u9727\uff09"];return e.features.filter((function(e){return t.includes(e.properties.type)})).map((function(e){var t=Object(y.a)({},e);return t.info="".concat(t.properties.type),t}))}var C=r(249),T=r(251),W=r(263),z=r(252),I=r(173),N=Object(I.a)({palette:{primary:{main:"#111111",background:"#eeeeee",opacity:.8},secondary:{main:"#eeeeee"}},typography:{fontFamily:["Noto Sans","sans-serif"].join(","),h1:{fontSize:24,fontWeight:"600"},body1:{fontSize:16,fontWeight:"300"}}}),V=r(114),Z=r.n(V),P=r(25),E=Object(C.a)((function(){return{root:{display:"inline-block",height:150,position:"absolute",top:0,zIndex:10},box:{padding:10,margin:N.spacing(2),background:N.palette.primary.background,opacity:N.palette.primary.opacity}}}));var H=function(e){var t=E();return Object(P.jsx)(T.a,{theme:N,children:Object(P.jsx)(W.a,{className:t.root,children:Object(P.jsxs)(W.a,{className:t.box,children:[Object(P.jsxs)(z.a,{variant:"h1",color:"primary",children:[e.title.title," ",e.title.code,"\uff08",e.title.type,"\uff09"]}),Object(P.jsxs)(W.a,{p:.5,children:[Object(P.jsxs)(z.a,{variant:"body1",color:"primary",children:["basetime : ",Z.a.utc(e.title.basetime).format()]}),Object(P.jsxs)(z.a,{variant:"body1",color:"primary",children:["validtime : ",Z.a.utc(e.title.validtime).format()]})]})]})})})},U=r(271),D=r(254),J=r(266),K=r(255),R=r(261),q=r(22),B=Object(C.a)((function(){return{root:{width:"100%",height:80,position:"absolute",bottom:0,zIndex:10},box:{paddingRight:20,paddingLeft:20,margin:N.spacing(2),height:40,background:N.palette.primary.background,opacity:N.palette.primary.opacity},select:{marginTop:N.spacing(.5),fontWeight:"bold",color:N.palette.primary.main},slider:{marginTop:N.spacing(.5),color:N.palette.primary.main}}})),_=Object(q.a)({root:{},thumb:{height:24,width:24,backgroundColor:N.palette.primary.background,border:"2px solid currentColor",marginTop:-8,marginLeft:-12,"&:focus, &:hover, &$active":{boxShadow:"inherit"}},active:{},rail:{height:8},mark:{height:8,width:1,marginTop:0}})(U.a);var $=function(e){var t=B(),r=Object(n.useState)(e.type),i=Object(l.a)(r,2),a=i[0],o=i[1],c=Object.keys(m.chartTypes).map((function(e){return Object(P.jsx)(J.a,{value:e,children:e},e)}));return Object(P.jsx)(T.a,{theme:N,children:Object(P.jsx)(W.a,{className:t.root,children:Object(P.jsx)(W.a,{className:t.box,children:Object(P.jsxs)(D.a,{container:!0,children:[Object(P.jsx)(D.a,{item:!0,xs:2,children:Object(P.jsx)(K.a,{children:Object(P.jsx)(R.a,{className:t.select,value:a,onChange:function(t){o(t.target.value),e.handleChangeType(t.target.value)},children:c})})}),Object(P.jsx)(D.a,{item:!0,xs:10,children:Object(P.jsx)(_,{className:t.slider,defaultValue:m.timeline.count-1,value:e.index,onChange:function(t,r){e.handleChangeIndex(r)},step:1,marks:!0,track:!1,min:0,max:m.timeline.count-1,disabled:!e.timeline})})]})})})})};var G=function(){var e=Object(n.useState)(null),t=Object(l.a)(e,2),r=t[0],i=t[1],a=Object(n.useState)(null),o=Object(l.a)(a,2),c=o[0],y=o[1];Object(n.useEffect)((function(){Object(p.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=c,!e.t0){e.next=7;break}return e.t1=i,e.next=5,O(c,A,x);case 5:e.t2=e.sent,(0,e.t1)(e.t2);case 7:case"end":return e.stop()}}),e)})))()}),[c]);var b=Object(n.useState)(Object.keys(m.chartTypes)[0]),v=Object(l.a)(b,2),x=v[0],k=v[1];Object(n.useEffect)((function(){Object(p.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=y,e.next=3,j(x);case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})))()}),[x]);var w=Object(n.useState)(m.timeline.count-1),L=Object(l.a)(w,2),A=L[0],F=L[1];Object(n.useEffect)((function(){Object(p.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.t0=c,!e.t0){e.next=7;break}return e.t1=i,e.next=5,O(c,A,x);case 5:e.t2=e.sent,(0,e.t1)(e.t2);case 7:case"end":return e.stop()}}),e)})))()}),[A]);var M=r&&Object(P.jsx)(H,{title:r.title}),C=r&&[{id:"chart-ice-layer",data:r.ices},{id:"chart-fog-layer",data:r.fogs},{id:"chart-isobar-layer",data:r.isobars},{id:"chart-front-layer",data:r.fronts}].map((function(e){return Object(P.jsx)(d.a,{id:e.id,data:e.data,stroked:function(e){return!!m.chart[e.properties.type].isStroke&&m.chart[e.properties.type].isStroke},filled:function(e){return!!m.chart[e.properties.type].isFill&&m.chart[e.properties.type].isFill},getFillColor:function(e){return m.chart[e.properties.type].color},getLineColor:function(e){return m.chart[e.properties.type].color},pointRadiusUnits:"pixels",pointRadiusScale:1,getRadius:function(e){return m.chart[e.properties.type].radius?m.chart[e.properties.type].radius:0},lineWidthUnits:"pixels",lineWidthScale:1,getLineWidth:function(e){return m.chart[e.properties.type].lineWidth?m.chart[e.properties.type].lineWidth:0},parameters:{cull:!0},pickable:!0,highlightColor:m.highlight.color,autoHighlight:!0})})),T=r&&[{id:"chart-center-title-layer",data:r.centerMarks,angle:180,offset:[-20,-60],iconAtlas:m.centerTitleLayer.iconAtlas,iconMapping:m.centerTitleLayer.iconMapping},{id:"chart-center-mark-layer",data:r.centerMarks,angle:180,offset:[0,0],iconAtlas:m.centerMarkLayer.iconAtlas,iconMapping:m.centerMarkLayer.iconMapping}].map((function(e){return Object(P.jsx)(h.a,{id:e.id,data:e.data,sizeUnits:"pixels",iconAtlas:e.iconAtlas,iconMapping:e.iconMapping,getIcon:function(e){return e.properties.type},getPosition:function(e){return e.geometry.coordinates},getSize:function(e){return m.chart[e.properties.type].iconSize},billboard:!1,getAngle:180,getPixelOffset:e.offset,pickable:!0,highlightColor:m.highlight.color,autoHighlight:!0})})),W=r&&Object(P.jsx)(h.a,{id:"chart-wind-arrow-layer",data:r.windArrows,sizeUnits:"pixels",iconAtlas:m.windArrowLayer.iconAtlas,iconMapping:m.windArrowLayer.iconMapping,getIcon:function(e){return e.properties.windSpeedKnot.value},getPosition:function(e){return e.geometry.coordinates},getSize:function(e){return m.chart[e.properties.type].iconSize},billboard:!1,getAngle:function(e){return 360-e.properties.windDegree.value},pickable:!0,highlightColor:m.highlight.color,autoHighlight:!0});return Object(P.jsxs)(n.Fragment,{children:[M,Object(P.jsx)($,{type:x,timeline:c,index:A,handleChangeType:function(){var e=Object(p.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),handleChangeIndex:function(){var e=Object(p.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:F(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),Object(P.jsxs)(u.a,{initialViewState:m.initialViewState,controller:!0,getTooltip:function(e){var t=e.object;return t&&t.info},getCursor:function(e){return e.isHovering?"pointer":"grab"},children:[Object(P.jsx)(f.a,{id:"background-layer",data:[[[-180,90],[0,90],[180,90],[180,-90],[0,-90],[-180,-90]]],getPolygon:function(e){return e},filled:!0,getFillColor:m.backgroundLayer.color}),Object(P.jsx)(d.a,{id:"map-layer",data:m.mapLayer.url,filled:!0,getFillColor:m.mapLayer.color}),Object(P.jsx)(d.a,{id:"latlon-line-layer",data:S,stroked:!0,getLineColor:m.latlonLineLayer.color,lineWidthUnits:"pixels",lineWidthScale:1,getLineWidth:1,pickable:!0,highlightColor:m.highlight.color,autoHighlight:!0}),W,C,T,Object(P.jsx)(g.a,{id:"map",width:"100%",controller:!0,resolution:1})]})]})},Q=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,273)).then((function(t){var r=t.getCLS,n=t.getFID,i=t.getFCP,a=t.getLCP,o=t.getTTFB;r(e),n(e),i(e),a(e),o(e)}))};o.a.render(Object(P.jsx)(i.a.StrictMode,{children:Object(P.jsx)(G,{})}),document.getElementById("root")),Q()}},[[210,1,2]]]);