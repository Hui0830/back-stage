(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{623:function(e,t,n){e.exports={style:"_1GBq9mlY_hYKRWnNXG0Vae"}},644:function(e,t,n){"use strict";n.r(t);n(96);var c=n(53),s=(n(42),n(10)),o=(n(48),n(20)),a=n(1),u=n.n(a),f=n(623),r=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}();function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var p=function(e){var t=e.title,n=e.name,a=e.onChange;return u.a.createElement("div",null,u.a.createElement("div",{className:"row"},u.a.createElement("label",{className:"col-l",htmlFor:"title"},"视频title："),u.a.createElement(o.a,{className:"col-r",id:"title",value:t,onChange:function(e){return a("title",e)}})),u.a.createElement("div",{className:"row"},u.a.createElement("label",{className:"col-l",htmlFor:"name"},"视频name："),u.a.createElement(o.a,{className:"col-r",id:"name",value:n,onChange:function(e){return a("name",e)}})))},l=function(e){function l(){var e,t,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l);for(var a=arguments.length,o=Array(a),r=0;r<a;r++)o[r]=arguments[r];return(t=n=i(this,(e=l.__proto__||Object.getPrototypeOf(l)).call.apply(e,[this].concat(o)))).state={showLargeVideo:!1,visible:!1,title:"shiping",name:"about as",url:"http://vali.cp31.ott.cibntv.net/youku/6773baf6b5b4371b06ef7468a/03000801005C1798F6487B61552FA5681FFC02-A6C3-4A70-9E55-99D027ABE111.mp4?sid=054581598700010001171_00_A6980397ce213e52e0f616f1cfde2ff03&sign=29255ec5b7688fa9532ff0303570db23&ctype=50"},n.onDelete=function(e){},n.onSave=function(){},n.onChange=function(e,t){switch(e){case"title":n.setState({title:t.target.value});break;case"name":n.setState({name:t.target.value});break;default:return}},i(n,t)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(l,a["PureComponent"]),r(l,[{key:"render",value:function(){var e=this,t=this.state,n=t.visible,a=t.showLargeVideo,o=t.title,r=t.name,l=t.url,i={title:o,name:r,onChange:this.onChange};return u.a.createElement("div",{className:f.style},u.a.createElement("div",{className:"video"},u.a.createElement("video",{controls:!0,poster:"http://plk956cz3.bkt.clouddn.com/83b01239b748d.jpg",src:l})),u.a.createElement("div",{className:"video-warp",title:o},u.a.createElement(s.a,{type:"eye",onClick:function(){return e.setState({showLargeVideo:!0})}}),u.a.createElement(s.a,{type:"edit",onClick:function(){return e.setState({visible:!0})}}),u.a.createElement(s.a,{type:"delete",onClick:function(){return e.onDelete()}})),u.a.createElement(c.a,{title:"视频信息编辑",visible:n,onOk:this.onSave,onCancel:function(){return e.setState({visible:!1})},okText:"保存编辑",cancelText:"取消"},u.a.createElement(p,i)),u.a.createElement(c.a,{visible:a,width:800,bodyStyle:{padding:10,boxShadow:"0 0 4px #fff"},footer:null,onCancel:function(){return e.setState({showLargeVideo:!1})}},u.a.createElement("video",{width:780,controls:!0,preload:"auto",src:"http://vali.cp31.ott.cibntv.net/youku/6773baf6b5b4371b06ef7468a/03000801005C1798F6487B61552FA5681FFC02-A6C3-4A70-9E55-99D027ABE111.mp4?sid=054581598700010001171_00_A6980397ce213e52e0f616f1cfde2ff03&sign=29255ec5b7688fa9532ff0303570db23&ctype=50"})))}}]),l}();t.default=l}}]);