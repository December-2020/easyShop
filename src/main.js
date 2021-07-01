import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'

// 动态修改html元素的字体大小
import 'amfe-flexible'
import 'vant/lib/index.less'

import {
  Tabbar,TabbarItem,
  Search,Image as VantImage,
  Swipe,SwipeItem,Lazyload,
  Grid,GridItem,
  Overlay,Loading,
  NoticeBar,
  Icon,
  Tabs,Tab,Divider,
  NumberKeyboard,
  Form,Field,Button,Toast,
  GoodsAction, GoodsActionIcon, GoodsActionButton,Sku,
  SwipeCell,Card,CheckboxGroup,Checkbox,
  ContactCard, SubmitBar,Step, Steps,
} from 'vant'

Vue.config.productionTip = false

Vue.use(Tabbar).use(TabbarItem);
Vue.use(Search).use(VantImage);
Vue.use(Swipe).use(SwipeItem).use(Lazyload);
Vue.use(Grid).use(GridItem);
Vue.use(Overlay).use(Loading);
Vue.use(NoticeBar);
Vue.use(Icon);
Vue.use(Tabs).use(Tab).use(Divider);
Vue.use(NumberKeyboard);
Vue.use(Form).use(Field).use(Button).use(Toast);
Vue.use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon).use(Sku);
Vue.use(SwipeCell).use(Card).use(CheckboxGroup).use(Checkbox);
Vue.use(ContactCard).use(SubmitBar).use(Step).use(Steps);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
