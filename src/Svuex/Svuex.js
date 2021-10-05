let Vue
class Store {
    constructor(options) {

    //    1.保存选项
        this.$$options = options
        //    2。暴漏state属性,变更对传入的state选项做相应处理
        // Vue.util.defineReactive(this, 'state', this.$options.state)
        // 希望用用户明白 不要访问内部变量
        this._vm = new Vue({
            data() {
                return {
                    $$state: options.state
                }
            }
        })
        this._mutations = options.mutations;
        this._actions = options.actions;
    //        绑定上下文
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
        this.getters = {}
        Object.keys(options.getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => options.getters[key](this.state)
            })
        })
    }
    get state() {
        return this._vm._data.$$state
    }
    set state(v) {
        console.error('please use replaceState to reset state')
    }
    // $store.commit(type, payload)
    commit(type,payload) {
        console.log(type)
        const entry = this._mutations[type]
        if(!entry) {
            console.error('unknown mutations!')
        }
        entry(this.state, payload)

    }
    dispatch(type, payload) {
        console.log(type)
        const entry = this._actions[type]
        if(!entry) {
            console.error('unknown action type!')
        }
        entry(this, payload)
    }

}
function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}


// 导出的对象对象就是vuex
export default {
    Store,
    install,
}