/**
 * Created by Kim Ning Ruan on 2017/10/16.
 */
import { playMode } from './../assets/js/config'
let state = {
  singer: {}, //歌手信息
  playing: false,
  fullPage: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state
