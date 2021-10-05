import Vue from 'vue'
import Vuex from './kvuex'

// this.$store
// this.$store.state.xxx
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    nums: 1,
  },
  mutations: {
    add(state) {
      // state从哪来？
      state.counter++
    },
    updateNUms(state) {
      state.nums++
    }
  },
  actions: {
    add({commit}) {
      // 参数是什么，哪来的？
      setTimeout(() => {
        commit('add')
      }, 1000)
    },
      updateNUms({commit}) {
          setTimeout(() => {
              commit('updateNUms')
          }, 1000)
      }
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    },
      numsComped(state) {
        return state.nums
      }
  }
})
