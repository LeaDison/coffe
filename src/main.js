import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import {
  Tabbar, TabbarItem, Search, Swipe, SwipeItem, Lazyload, Grid, GridItem
  , Tab, Tabs, Stepper, NavBar, Toast, Checkbox, CheckboxGroup, SubmitBar, Empty,
  Cell, CellGroup, Form, Field, Button, ActionSheet, Uploader,Dialog,ImagePreview
} from 'vant';

Vue.use(Tabbar).use(ImagePreview).use(Dialog).use(ActionSheet).use(Uploader).use(Button).use(Form).use(Field).use(Cell).use(CellGroup).use(SubmitBar).use(Empty).use(Checkbox).use(CheckboxGroup).use(Toast).use(TabbarItem).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(Grid).use(GridItem).use(Tab).use(Tabs).use(Stepper).use(NavBar);


import axios from 'axios';
Vue.prototype.axios = axios;



let token = localStorage.getItem("TOKEN") || ''
Vue.prototype.$token = token
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
