/**
 * Created by Kim Ning Ruan on 2017/10/16.
 */
//import state from "./state";
/*export const singer = function (state){
  return state.singer
}*/
export const singer = state => state.singer //就是return state.singer

export const playing = state => state.playing

export const fullPage = state => state.fullPage

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = state => {
  return state.playList[state.currentIndex] || {}
}

export const disc = state => state.disc
