(this["webpackJsonpjma-xml-chart-viewer"]=this["webpackJsonpjma-xml-chart-viewer"]||[]).push([[0],{121:function(e,t){},155:function(e,t,r){},156:function(e,t,r){},157:function(e,t,r){},160:function(e,t){},166:function(e,t,r){"use strict";r.r(t);var n=r(24),o=r.n(n),i=r(132),a=r.n(i),c=(r(155),r(116)),s=r.n(c),l=r(55),u=r(133),p=r(142),f=(r(156),r(180)),d=r(182),h=r(183),g=r(187),y=r(141),j=r(188),m=r(117),x={"\u7b49\u5727\u7dda":{color:[222,222,222],lineWidth:2,isStroke:!0},"\u7b49\u5727\u7dda\uff08\u4e3b\u7dda\uff09":{color:[222,222,222],lineWidth:4,isStroke:!0},"\u7b49\u5727\u7dda\uff08\u88dc\u52a9\uff09":{color:[222,222,222],lineWidth:2,isStroke:!0},"\u5bd2\u51b7\u524d\u7dda":{color:[64,64,255],lineWidth:4,isStroke:!0},"\u6e29\u6696\u524d\u7dda":{color:[255,64,64],lineWidth:4,isStroke:!0},"\u505c\u6ede\u524d\u7dda\uff08\u5947\u6570\uff09":{color:[255,64,64],lineWidth:4,isStroke:!0},"\u505c\u6ede\u524d\u7dda\uff08\u5076\u6570\uff09":{color:[64,64,255],lineWidth:4,isStroke:!0},"\u9589\u585e\u524d\u7dda":{color:[128,0,255],lineWidth:4,isStroke:!0},"\u53f0\u98a8":{text:"\u53f0",color:[255,0,0]},"\u9ad8\u6c17\u5727":{text:"\u9ad8",color:[0,0,255]},"\u4f4e\u6c17\u5727":{text:"\u4f4e",color:[255,0,0]},"\u71b1\u5e2f\u4f4e\u6c17\u5727":{text:"\u71b1",color:[255,0,0]},"\u4f4e\u5727\u90e8":{text:"\u4f4e",color:[255,0,0]},"\u60aa\u5929\u60c5\u5831\uff08\u5f37\u98a8\uff09":{color:[255,0,0],radius:4,isFill:!0},"\u60aa\u5929\u60c5\u5831\uff08\u9727\uff09":{color:[255,0,255,64],lineWidth:4,isFill:!0},"\u60aa\u5929\u60c5\u5831\uff08\u6d77\u6c37\uff09":{color:[192,192,255,127],isFill:!0}},b=function(){for(var e=[],t=-180;t<180;t+=10)for(var r=-80;r<80;r+=1)e.push({start:[t,r],end:[t,r+1],properties:{type:"\u7d4c\u7dda",name:"".concat(Math.abs(t),"\xb0").concat(t<0?"W":"E")}});for(var n=-80;n<90;n+=10)for(var o=-180;o<180;o+=1)e.push({start:[o,n],end:[o+1,n],properties:{type:"\u7def\u7dda",name:"".concat(Math.abs(n),"\xb0").concat(n<0?"S":"N")}});return e}();function O(e){var t,r=[],n=[],o=Object(m.a)(e.features);try{for(o.s();!(t=o.n()).done;){var i=t.value;switch(i.properties.type){case"\u7b49\u5727\u7dda":if(i.properties.pressure.value%20===0)i.properties.type="\u7b49\u5727\u7dda\uff08\u4e3b\u7dda\uff09";else if(i.properties.pressure.value%4){for(var a=[],c=0;c<i.geometry.coordinates.length-1;c++)a.push([i.geometry.coordinates[c],i.geometry.coordinates[c+1]]);i.properties.type="\u7b49\u5727\u7dda\uff08\u88dc\u52a9\uff09",i.geometry.type="MultiLineString",i.geometry.coordinates=a.filter((function(e,t){return parseInt(t/10)%2===0}))}break;case"\u505c\u6ede\u524d\u7dda":for(var s=[],u=0;u<i.geometry.coordinates.length-1;u++)s.push([i.geometry.coordinates[u],i.geometry.coordinates[u+1]]);var p=Object(l.a)({},i),f=Object(l.a)({},i);f.properties=Object(l.a)({},i.properties),p.properties=Object(l.a)({},i.properties),f.geometry=Object(l.a)({},i.geometry),p.geometry=Object(l.a)({},i.geometry),f.properties.type="\u505c\u6ede\u524d\u7dda\uff08\u5947\u6570\uff09",p.properties.type="\u505c\u6ede\u524d\u7dda\uff08\u5076\u6570\uff09",f.geometry.type="MultiLineString",p.geometry.type="MultiLineString",f.geometry.coordinates=s.filter((function(e,t){return parseInt(t/20)%2===0})),p.geometry.coordinates=s.filter((function(e,t){return parseInt(t/20)%2!==0})),r.push(f),r.push(p),n.push(i)}}}catch(y){o.e(y)}finally{o.f()}e.features=e.features.filter((function(e){return!n.includes(e)}));for(var d=0,h=r;d<h.length;d++){var g=h[d];e.features.push(g)}return e}function v(e){var t,r=[],n=Object(m.a)(e.features);try{for(n.s();!(t=n.n()).done;){var o=t.value;switch(o.properties.type){case"\u53f0\u98a8":case"\u4f4e\u6c17\u5727":case"\u9ad8\u6c17\u5727":case"\u71b1\u5e2f\u4f4e\u6c17\u5727":case"\u4f4e\u5727\u90e8":r.push({title:x[o.properties.type].text,type:o.properties.type,coordinates:o.geometry.coordinates})}}}catch(i){n.e(i)}finally{n.f()}return r}r(157);var S=r(118),k=r.n(S),W=r(36);var F=function(e){return Object(W.jsxs)("article",{className:"ChartTitle",children:[Object(W.jsxs)("h1",{children:[e.title.title,"\uff08",e.title.type,"\uff09"]}),Object(W.jsxs)("p",{children:["basetime : ",k()(e.title.basetime).format()]}),Object(W.jsxs)("p",{children:["validtime : ",k()(e.title.validtime).format()]})]})},P={longitude:140,latitude:40,zoom:1.2},w="VZSA60",C="https://jma-xml-api-mrfbzypr4q-an.a.run.app/".concat(w,"/latest.json");var I=function(){var e=Object(n.useState)(null),t=Object(p.a)(e,2),r=t[0],o=t[1];Object(n.useEffect)((function(){Object(u.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(C).then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then((function(e){return fetch("https://xml2chart-api-mrfbzypr4q-an.a.run.app/?url=".concat(e[0].url))})).then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then((function(e){return{geojson:e=O(e),texts:v(e),title:Object(l.a)(Object(l.a)({},e.properties),{},{type:w})}})).catch((function(e){console.error("".concat(e))}));case 2:t=e.sent,o(t);case 4:case"end":return e.stop()}}),e)})))()}),[]);var i=r&&Object(W.jsx)(d.a,{id:"chart-shape-layer",data:r.geojson,stroked:function(e){return!!x[e.properties.type].isStroke&&x[e.properties.type].isStroke},filled:function(e){return!!x[e.properties.type].isFill&&x[e.properties.type].isFill},getFillColor:function(e){return x[e.properties.type].color},getLineColor:function(e){return x[e.properties.type].color},pointRadiusUnits:"pixels",pointRadiusScale:1,getRadius:function(e){return x[e.properties.type].radius?x[e.properties.type].radius:0},lineWidthUnits:"pixels",lineWidthScale:1,getLineWidth:function(e){return x[e.properties.type].lineWidth?x[e.properties.type].lineWidth:0},parameters:{depthTest:!0,cull:!0},getPolygonOffset:function(e){e.layerIndex;return[0,-2e4]}}),a=Object.keys(x).map((function(e){return x[e]})).filter((function(e){return e.text})).map((function(e){return e.text})),c=r&&Object(W.jsx)(h.a,{id:"chart-text-layer",data:r.texts,getAlignmentBaseline:"center",getAngle:0,getPosition:function(e){return e.coordinates},getSize:32,getText:function(e){return e.title},characterSet:a,getTextAnchor:"middle",sizeScale:1,getColor:function(e){return x[e.type].color},getPixelOffset:[20,20],getPolygonOffset:function(e){e.layerIndex;return[0,-9e4]}}),m=r&&Object(W.jsx)(F,{title:r.title});return Object(W.jsxs)(n.Fragment,{children:[m,Object(W.jsxs)(f.a,{initialViewState:P,controller:!0,children:[i,c,Object(W.jsx)(g.a,{id:"latlon-line-layer",data:b,getSourcePosition:function(e){return e.start},getTargetPosition:function(e){return e.end},getColor:[127,127,127],getWidth:1,getPolygonOffset:function(e){e.layerIndex;return[0,-1e4]}}),Object(W.jsx)(d.a,{id:"map-layer",data:"https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson",filled:!0,getFillColor:[64,64,64],parameters:{depthTest:!0,cull:!0},getPolygonOffset:function(e){e.layerIndex;return[0,-1e4]}}),Object(W.jsx)(y.a,{id:"background",data:[[[-180,90],[0,90],[180,90],[180,-90],[0,-90],[-180,-90]]],getPolygon:function(e){return e},filled:!0,getFillColor:[32,32,32],parameters:{depthTest:!0,cull:!0},getPolygonOffset:function(e){e.layerIndex;return[0,1e4]}}),Object(W.jsx)(j.a,{id:"map",width:"100%",controller:!0})]})]})},T=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,189)).then((function(t){var r=t.getCLS,n=t.getFID,o=t.getFCP,i=t.getLCP,a=t.getTTFB;r(e),n(e),o(e),i(e),a(e)}))};a.a.render(Object(W.jsx)(o.a.StrictMode,{children:Object(W.jsx)(I,{})}),document.getElementById("root")),T()}},[[166,1,2]]]);
//# sourceMappingURL=main.950d00a7.chunk.js.map