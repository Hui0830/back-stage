(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{620:function(e,t,n){e.exports={style:"_1GBq9mlY_hYKRWnNXG0Vae"}},693:function(e,t,n){"use strict";n.r(t);n(106);var a=n(58),r=(n(45),n(11)),o=(n(51),n(19)),l=n(1),i=n.n(l),c=n(620),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),f="/lwh/mycode/back-stage/src/pages/stuff/video.jsx";function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var b=function(e){var t=e.title,n=e.name,a=e.onChange;return i.a.createElement("div",{__source:{fileName:f,lineNumber:8}},i.a.createElement("div",{className:"row",__source:{fileName:f,lineNumber:9}},i.a.createElement("label",{className:"col-l",htmlFor:"title",__source:{fileName:f,lineNumber:10}},"视频title："),i.a.createElement(o.a,{className:"col-r",id:"title",value:t,onChange:function(e){return a("title",e)},__source:{fileName:f,lineNumber:11}})),i.a.createElement("div",{className:"row",__source:{fileName:f,lineNumber:13}},i.a.createElement("label",{className:"col-l",htmlFor:"name",__source:{fileName:f,lineNumber:14}},"视频name："),i.a.createElement(o.a,{className:"col-r",id:"name",value:n,onChange:function(e){return a("name",e)},__source:{fileName:f,lineNumber:15}})))},p=function(e){function t(){var e,n,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=Array(r),l=0;l<r;l++)o[l]=arguments[l];return n=a=m(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),a.state={showLargeVideo:!1,visible:!1,title:"shiping",name:"about as",url:"http://vali.cp31.ott.cibntv.net/youku/6773baf6b5b4371b06ef7468a/03000801005C1798F6487B61552FA5681FFC02-A6C3-4A70-9E55-99D027ABE111.mp4?sid=054581598700010001171_00_A6980397ce213e52e0f616f1cfde2ff03&sign=29255ec5b7688fa9532ff0303570db23&ctype=50"},a.onDelete=function(e){console.log("delete video")},a.onSave=function(){console.log("video edit save")},a.onChange=function(e,t){switch(e){case"title":a.setState({title:t.target.value});break;case"name":a.setState({name:t.target.value});break;default:return}},m(a,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l["PureComponent"]),s(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.visible,o=t.showLargeVideo,l=t.title,s=t.name,m=t.url,p={title:l,name:s,onChange:this.onChange};return i.a.createElement("div",{className:c.style,__source:{fileName:f,lineNumber:65}},i.a.createElement("div",{className:"video",__source:{fileName:f,lineNumber:66}},i.a.createElement("video",{controls:!0,poster:"http://plk956cz3.bkt.clouddn.com/83b01239b748d.jpg",src:m,__source:{fileName:f,lineNumber:67}})),i.a.createElement("div",{className:"video-warp",title:l,__source:{fileName:f,lineNumber:69}},i.a.createElement(r.a,{type:"eye",onClick:function(){return e.setState({showLargeVideo:!0})},__source:{fileName:f,lineNumber:70}}),i.a.createElement(r.a,{type:"edit",onClick:function(){return e.setState({visible:!0})},__source:{fileName:f,lineNumber:71}}),i.a.createElement(r.a,{type:"delete",onClick:function(){return e.onDelete()},__source:{fileName:f,lineNumber:72}})),i.a.createElement(a.a,{title:"视频信息编辑",visible:n,onOk:this.onSave,onCancel:function(){return e.setState({visible:!1})},okText:"保存编辑",cancelText:"取消",__source:{fileName:f,lineNumber:74}},i.a.createElement(b,u({},p,{__source:{fileName:f,lineNumber:82}}))),i.a.createElement(a.a,{visible:o,width:800,bodyStyle:{padding:10,boxShadow:"0 0 4px #fff"},footer:null,onCancel:function(){return e.setState({showLargeVideo:!1})},__source:{fileName:f,lineNumber:84}},i.a.createElement("video",{width:780,controls:!0,preload:"auto",src:"http://vali.cp31.ott.cibntv.net/youku/6773baf6b5b4371b06ef7468a/03000801005C1798F6487B61552FA5681FFC02-A6C3-4A70-9E55-99D027ABE111.mp4?sid=054581598700010001171_00_A6980397ce213e52e0f616f1cfde2ff03&sign=29255ec5b7688fa9532ff0303570db23&ctype=50",__source:{fileName:f,lineNumber:91}})))}}]),t}();t.default=p}}]);