(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a225000"],{"4c41":function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return t.userInfo?a("div",{staticClass:"my"},[a("div",{staticClass:"user"},[a("div",{staticClass:"left"},[a("div",{staticClass:"img"},[a("van-image",{attrs:{src:t.userInfo.avatar,round:"","lazy-load":""}})],1),a("div",{staticClass:"info"},[a("div",{staticClass:"name"},[a("p",[t._v(t._s(t.userInfo.nickname))]),a("div",{staticClass:"id"},[a("span",[t._v("ID: "+t._s(t.userInfo.uid))]),a("van-icon",{attrs:{name:"edit"}})],1)]),a("div",{staticClass:"vip"},[a("van-image",{attrs:{src:t.userInfo.vip_icon,round:"","lazy-load":""}}),a("span",[t._v(t._s(t.userInfo.vip_name))])],1)])]),a("div",{staticClass:"right"},[a("van-icon",{attrs:{name:"setting-o"}})],1)]),a("div",{staticClass:"mes"},[a("div",{staticClass:"floor1"},[a("ul",[a("li",[a("p",{staticClass:"t"},[t._v("我的余额")]),a("p",{staticClass:"m"},[t._v(t._s(t.userInfo.now_money))])]),a("li",[a("p",{staticClass:"t"},[t._v("当前佣金")]),a("p",{staticClass:"m"},[t._v(t._s(t.userInfo.extractPrice))])]),a("li",[a("p",{staticClass:"t"},[t._v("优惠劵")]),a("p",{staticClass:"m"},[t._v(t._s(t.userInfo.extractTotalPrice))])])])]),a("div",{staticClass:"floor2"},[a("div",{staticClass:"title"},[a("p",{staticClass:"l"},[t._v("我的订单")]),a("p",{staticClass:"r"},[t._v("全部订单"),a("van-icon",{attrs:{name:"arrow"}})],1)]),a("van-grid",{attrs:{"column-num":5}},[a("van-grid-item",{attrs:{icon:"pending-payment",badge:t.userInfo.orderStatusNum.unpaid_count,text:"待付款"}}),a("van-grid-item",{attrs:{icon:"certificate",badge:t.userInfo.orderStatusNum.order_count,text:"待发货"}}),a("van-grid-item",{attrs:{icon:"logistics",badge:t.userInfo.orderStatusNum.complete_count,text:"待收货"}}),a("van-grid-item",{attrs:{icon:"comment-o",badge:t.userInfo.orderStatusNum.evaluated_count,text:"待评价"}}),a("van-grid-item",{attrs:{icon:"after-sale",badge:t.userInfo.orderStatusNum.refund_count,text:"售后"}})],1)],1),a("div",{staticClass:"floor3"},[a("div",{staticClass:"title"},[t._v("我的服务")]),a("van-grid",{attrs:{"column-num":4}},[a("van-grid-item",{attrs:{icon:"user-o",text:"会员中心"}}),a("van-grid-item",{attrs:{icon:"gift-o",text:"砍价记录"}}),a("van-grid-item",{attrs:{icon:"friends-o",text:"我的推广"}}),a("van-grid-item",{attrs:{icon:"gold-coin-o",text:"我的余额"}}),a("van-grid-item",{attrs:{icon:"location-o",text:"地址信息"}}),a("van-grid-item",{attrs:{icon:"star-o",text:"我的收藏"}}),a("van-grid-item",{attrs:{icon:"coupon-o",text:"优惠劵"}}),a("van-grid-item",{attrs:{icon:"service-o",text:"联系客服"}})],1)],1),a("van-button",{attrs:{type:"primary",round:"",large:"",block:"",color:"#e93323"},on:{click:t.logOut}},[t._v("退出登录")])],1)]):t._e()},n=[],e=a("5530"),o=a("2f62"),r={name:"My",data:function(){return{userInfo:null}},components:{},created:function(){this.userInfo=this.$store.getters.loginUser,null==this.userInfo&&this.$router.push("/login")},computed:Object(e["a"])({},Object(o["c"])(["loginUser"])),methods:Object(e["a"])({logOut:function(){var t=this;this.loginOut(),this.$toast({message:"已退出登录",onClose:function(){t.$router.push("/login")}})}},Object(o["d"])(["saveToken","saveLoginInfo","loginOut"]))},c=r,u=(a("af01"),a("2877")),l=Object(u["a"])(c,i,n,!1,null,null,null);s["default"]=l.exports},af01:function(t,s,a){"use strict";a("b50f")},b50f:function(t,s,a){}}]);
//# sourceMappingURL=chunk-2a225000.c2a49a3c.js.map