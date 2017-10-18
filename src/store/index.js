/**
 * vuex
 * Created by kim Ning Ruan on 2017/10/16
 */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getter' //一定要getters这个名字
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  actions,
  state,
  mutations

})
