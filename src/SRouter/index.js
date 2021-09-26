// self router
// import Vue from "vue";
let Vue
class VueRouter {
    constructor() {
        // Vue
    }
}
// 参数1 是 vue 的构造函数

VueRouter.install = function (_Vue) {
    //    传入构造函数,对 vue进行扩展
    Vue = _Vue;
    // 1。 注册 $router. 让所有的组件实例都可以访问
    // 混入： Vue.mixin({})
    Vue.mixin({
        beforreCreate() {
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
            console.log(this)
            return h('a', {
                attrs: {
                    href: `#${this.to}`
                }
            },this.$slots.default)
        }
    })
    Vue.component('router-view', {
        render(h) {
            return h('div', 'router-view')
        }
    })
}

export default VueRouter