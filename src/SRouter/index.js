// self router
// import Vue from "vue";
let Vue
class VueRouter {
    constructor(options) {
        // Vue
        //1.保存路由选项
        this.$options = options;
        //初始化 current
        const inital = window.location.hash.slice(1) || "/"
        // Vue.util.defineReactive 可以给当前的对象指定一个响应式的属性
        // 参考 vue.runtime.esm.js  Vue.util  public方法
        Vue.util.defineReactive(this, 'current', inital)
    // 2.监控 href变化
        window.addEventListener('hashchange', () => {
            //  例子  hash:#/about
            this.current = window.location.hash.slice(1)
            console.log(this.current)
            console.log(Vue.util)
        })
        // 方法2 初始化 current
        // window.addEventListener('load', () => {
        //     this.current = "/"
        // })


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
            /*
            * 等同与 <a href={'#'+ this.to}>this.$slots.default</a>
            *
            *
            * */
        }
    })
    Vue.component('router-view', {
        render(h) {
            let component = null;
            //1. 获取当前的 url的 hash 部分
            // return h('div', {}, this.$slots.defulat)
            //2. 根据hash部分从路由表中获取对应的组件
            const route = this.$router.$options.routes.find((route) =>
                route.path === this.$router.current
            );
            if(route) {
                component = route.component
            }
            return h(component)
        }
    })
}

export default VueRouter