import Vue from "vue";
import Vuex from "./Svuex";

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        counter: 0,
        currents: ""
    },
    mutations: {
        add(state) {
            // state从哪来？
            state.counter++
        },
        changecurrents(state, payload) {
            state.currents = payload
        }
    },
    actions: {
        add({commit}) {
            // 参数是什么，哪来的？
            setTimeout(() => {
                commit('add')
            }, 1000)
        },
        currenteffect({commit}, payload) {
            setTimeout(() => {
                commit('changecurrents', payload)
            }, 1000)
        }
    },
    getters: {
        doubleCounter(state) {
            return state.counter * 2
        }
    }
})

export default store
