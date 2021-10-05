// self router
// import Vue from "vue";
import View from "./srouter-view"
let Vue
class VueRouter {
    constructor(options) {
        this.$options = options;
        this.current = window.location.hash.slice(1) || "/"
        Vue.util.defineReactive(this, 'matched', [])
        // match方法可以递归便利路由表，获得匹配关系的数组
        this.match()
        window.addEventListener('hashchange', this.onHasChange.bind(this))
        window.addEventListener('load', this.onHasChange.bind(this))

    }

    onHasChange() {
        this.current = window.location.hash.slice(1);
        this.matched = [];
        this.match()
    }

    match(routes) {
      console.log(this.matched);
        routes = routes || this.$options.routes
        //    递归遍历路由表
        for (const route of routes) {
            if(route.path === '/' && this.current === '/') {
                this.matched.push(route)
                return
            }
            // /about/info
            if(route.path !== '/' && this.current.indexOf(route.path) != -1) {
                this.matched.push(route)
                if(route.children) {
                    this.match(route.children)
                }
                return
            }
        }
    }

}
// 参数1 是 vue 的构造函数

VueRouter.install = function (_Vue) {
    //    传入构造函数,对 vue进行扩展
    Vue = _Vue;
    // 1。 注册 $router. 让所有的组件实例都可以访问
    // 混入： Vue.mixin({})
    Vue.mixin({
        beforeCreate() {
            // 延迟执行, 延迟到vue和 router实例创建完毕
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }

    })

    // 2.注册两个全局组件 router-link router-view
    // vue。component 没有tempalte 解析器 因此要使用 render
    // <router-link to="/home">home<router-lint>
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            // <a href=""#/home>xxxx</a>
            // h 是render函数调用时，框架传入的 createElement
            // 等同于 React中的 createElement, 返回 vdom\
            return h('a', {
                attrs: {
                    href: `#${this.to}`
                }
            },this.$slots.default)
        }
    })
    Vue.component('RouterView', View)
}

export default VueRouter