import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'
import * as getters from './modules/getters'
import * as actions from './modules/actions'
import * as mutations from './modules/mutations'


Vue.use(Vuex)

const state = {
  resturantName: '飞歌餐馆' // 默认值
  // id: xxx  如果还有全局状态也可以在这里添加
  // name:xxx
}

export default new Vuex.Store({
  modules: {
    common,
    user,
    state,
    getters,
    actions,
    mutations
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
