import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// import router from './krouter'
import vueRouter from "./SRouter"
import store from './kstore'
// import Home from "./views/Home";
// import store from './store'
// import router from './router'

/*
* vue 插件
* 1.fn
* 2.object.install
* 3. Vue.use这个方法会调用插件的install方法
*
* */
Vue.use(vueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]
const router = new vueRouter({
  routes
})



Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  // 添加到配置项中，为什么？
  router,

  store,
  render: h => h(App)
}).$mount('#app')
