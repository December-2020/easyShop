(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18d23039"],{"2d3b":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search"},[a("van-search",{attrs:{shape:"round",placeholder:"请输入产品名称"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search.apply(null,arguments)}},model:{value:t.searchVal,callback:function(e){t.searchVal="string"===typeof e?e.trim():e},expression:"searchVal"}}),a("div",{staticClass:"mes"},[t.list.length<1?a("div",{staticClass:"nullSearch"},[t._v("暂无结果")]):a("div",{staticClass:"hasSearch"},[a("div",{staticClass:"t"},[t._v("结果如下:")]),a("ul",t._l(t.list,(function(t){return a("li",{key:t.id},[a("picture-item",{attrs:{item:t}})],1)})),0)])])],1)},s=[],i=(a("4de4"),a("9f10")),r={components:{PictureItem:i["a"]},data:function(){return{searchVal:"",list:[]}},methods:{search:function(){var t=this;this.$axios.get("api/product/detail/74").then((function(e){var a=e.data.data.good_list.filter((function(e){return-1!=e.store_name.indexOf(t.searchVal)}));t.list=a}))}}},l=r,c=(a("9ed0"),a("2877")),u=Object(c["a"])(l,n,s,!1,null,null,null);e["default"]=u.exports},"9ed0":function(t,e,a){"use strict";a("a40f")},a40f:function(t,e,a){}}]);
//# sourceMappingURL=chunk-18d23039.6f414b2c.js.map