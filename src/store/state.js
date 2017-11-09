/**
 * Created by Kim Ning Ruan on 2017/10/16.
 */
import { playMode } from './../assets/js/config'

let state = {
  singer: {}, //歌手信息
  playing: false, //正在播放
  fullPage: false, //是否全屏播放
  playList: [], //播放列表
  sequenceList: [], //
  mode: playMode.sequence, //播放模式
  currentIndex: -1, //当前播放的歌曲序号
  discId: 0 //歌单信息
}

export default state
