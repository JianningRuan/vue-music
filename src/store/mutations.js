/**
 * Created by Kim Ning Ruan on 2017/10/16.
 */
import * as types from './mutation-type'

const mutations = {
  [types.SET_SINGER](state, singer){
    state.singer = singer
  },
  [types.SET_PLAYING](state, playing){
    state.playing = playing
  },
  [types.SET_FULL_PAGE](state, fullPage){
    state.fullPage = fullPage
  },
  [types.SET_PLAY_LIST](state, playList){
    state.playList = playList
  },
  [types.SET_SEQUENCE_LIST](state, sequenceList){
    state.sequenceList = sequenceList
  },
  [types.SET_MODE](state, mode){
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, currentIndex){
    state.currentIndex = currentIndex
  },
  [types.SET_DISC_ID](state, discId){
    state.discId = discId
  }
}
export default mutations
