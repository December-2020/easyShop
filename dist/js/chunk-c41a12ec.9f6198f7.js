(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c41a12ec"],{"2ac1":function(t,n,a){},"76a1":function(t,n,a){"use strict";a.r(n);var i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"pay"},[a("div",{staticClass:"content"},[a("van-icon",{attrs:{name:"checked",color:"#e93323"}}),a("div",{staticClass:"con"},[a("div",{staticClass:"t"},[t._v("订单支付成功")]),a("div",{staticClass:"m"},[a("ul",[a("li",[a("span",[t._v("订单编号")]),a("span",[t._v(t._s(t.id))])]),a("li",[a("span",[t._v("下单时间")]),a("span",[t._v(t._s(t.dObj.add_time_y)+" "+t._s(t.dObj.add_time_h))])]),t._m(0),a("li",[a("span",[t._v("支付金额")]),a("span",[t._v(t._s(t.dObj.total_price))])])])]),a("div",{staticClass:"b"},[a("p",[a("van-button",{attrs:{type:"danger",round:""},on:{click:t.goDispatching}},[t._v("查看订单")])],1),a("p",[a("van-button",{attrs:{color:"#ee0a24",round:"",plain:""},on:{click:t.goIndex}},[t._v("返回首页")])],1)])])],1)])},s=[function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("li",[a("span",[t._v("支付方式")]),a("span",[t._v("余额支付")])])}],c={props:["id"],data:function(){return{sumPrice:0,cTime:0,orderStr:"",dObj:{}}},activated:function(){var t=this;this.axios.get("api/order/detail/"+this.id).then((function(n){t.dObj=n.data.data}))},methods:{goIndex:function(){this.$router.push("/")},goDispatching:function(){this.$router.push("/dispatching/"+this.id)}}},e=c,o=(a("eb4d"),a("2877")),d=Object(o["a"])(e,i,s,!1,null,null,null);n["default"]=d.exports},eb4d:function(t,n,a){"use strict";a("2ac1")}}]);
//# sourceMappingURL=chunk-c41a12ec.9f6198f7.js.map