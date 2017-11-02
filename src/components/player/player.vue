<template>
  <div class="player" v-show="playList.length">
    <!--全屏播放器-->
    <transition name="slide-down">
      <div class="pos-wrapper full-page-player play-bg" v-show="fullPage">
        <div class="play-bg-layer">
          <img width="100%" height="100%" :src="currentSong.image"/>
        </div>
        <div class="top">
          <div class="back" @click="closePlayer"><i class="iconfont icon-down"></i></div>
          <h1 v-html="currentSong.songName"></h1>
          <h2 v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="cdClass">
                <img :src="currentSong.image"/>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="slider-nav"></div>
          <div class="progress-wrapper">
            <div class="progress-bar-wrapper">
              <div class="p-time time-l">{{format(currentTime)}}</div>
              <progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
              <div class="p-time time-r">{{format(currentSong.interval)}}</div>
            </div>
          </div><!--进度条-->
          <div class="opa-nav">
            <a class="opa-btn iconfont icon-random-play" :class="iconMode" @click="changeMode"></a>
            <a class="opa-btn iconfont icon-prev" :class="readyIcon" @click="prev"></a>
            <a class="play-btn iconfont" :class="playIcon, readyIcon" @click="playBtn"></a>
            <a class="opa-btn iconfont icon-next" :class="readyIcon" @click="next"></a>
            <a class="opa-btn iconfont icon-collection"></a>
          </div><!--操作按钮-->
        </div>
      </div>
    </transition>
    <!--全屏播放器-end-->
    <!--迷你播放器-->
    <transition name="slide-down">
      <div class="pos-bottom-wrapper mini-player" v-show="!fullPage" @click="openPlayer">
        <div class="song-pic">
          <div class="song-pic-rotate" :class="cdClass">
            <img :src="currentSong.image"/>
          </div>
        </div>
        <div class="song-text">
          <h3 v-html="currentSong.songName"></h3>
          <p v-html="currentSong.singer"></p>
        </div>
        <div class="mini-opa iconfont" :class="playIcon" @click.stop.prevent="playBtn">
          <progress-circle class="btn" :radius="radius" :percent="percent"></progress-circle>
        </div>
        <div class="mini-opa-btn"></div>
      </div>
    </transition>
    <!--迷你播放器-end-->
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>
<script type="text/ecmascript-6">
  import './player.scss'
  import progressBar from './../../unit/progressBar/progress-bar';
  import progressCircle from './../../unit/progressCircle/progress-circle'
  import { mapGetters, mapMutations } from 'vuex'
  import { randomArray } from './../../assets/js/common';
  export default {
    components: {
      progressBar,
      progressCircle
    },
    computed: {
      playIcon(){
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      cdClass(){
        return this.playing ? 'play' : 'play pause'
      },
      readyIcon(){
        return this.loadReady ? '' : 'disable'
      },
      //返回进度百分比
      percent(){
        return this.currentTime / this.currentSong.interval
      },
      //返回播放模式
      iconMode(){
        let mode = this.mode;
        if (mode === 0){
          return 'icon-loop-play'; //顺序
        }else if (mode === 1){
          return 'icon-single-play'; //单曲
        }else {
          return 'icon-random-play'; //随机
        }
      },
      ...mapGetters([
        'fullPage',
        'playList',
        'sequenceList',
        'currentIndex',
        'playing',
        'mode',
        'currentSong'
      ])
    },
    watch: {
      currentIndex(newVal){
        //this.currentSong = this.playList[newVal]
      },
      currentSong(newVal, oldVal){
        if (newVal.id === oldVal.id){
          return
        }
        //播放
        this.$nextTick(()=>{
          this.setPlaying(true);
          this.play();
        })
      },
      playing(newPlaying){
        this.$nextTick(()=>{
          newPlaying ? this.play() : this.pause();
        })
      }
    },
    data(){
      return {
        loadReady: false,
        //currentSong: {},
        currentTime: 0,
        radius: 32
      }
    },
    methods: {
      closePlayer(){
        this.setFullPage(false)
      },
      openPlayer(){
        this.setFullPage(true)
      },
      play(){
        this.$refs.audio.play();
      },
      pause(){
        this.$refs.audio.pause();
      },
      playBtn(){
        this.setPlaying(!this.playing)
      },
      //上一首
      prev(){
        if (!this.loadReady){
          return
        }
        let index = this.currentIndex - 1;
        if (index == -1){
          index = this.playList.length - 1;
        }
        this.setCurrentIndex(index);
        this.loadReady = false
      },
      //下一首
      next(){
        if (!this.loadReady){
          return
        }
        let index = this.currentIndex + 1;
        if (index === this.playList.length){
          index = 0;
        }
        this.setCurrentIndex(index);
        this.loadReady = false
      },
      //监听播放完执行
      end(){
        this.next();
      },
      //歌曲加载完成
      ready(){
        this.loadReady = true
      },
      //加载出错时
      error(){
        this.loadReady = true
      },
      //监听歌曲时间变化
      updateTime(e){
        this.currentTime = e.target.currentTime;
      },
      //分秒格式化
      format(thisTime){
        thisTime = thisTime | 0;
        let min = thisTime / 60 | 0;
        let s = this._pad(thisTime % 60);
        return `${min}:${s}`
      },
      _pad(num, n = 2){
        let len = num.toString().length;
        while (len < n){
          num = '0' + num;
          len++;
        }
        return num
      },
      //监听进度条组件穿回来的状态
      percentChange(percent){
        let currentTime = this.currentSong.interval * percent;
        this.$refs.audio.currentTime = currentTime;
        if (!this.playing){
          this.play();
        }
      },
      //切换播放模式
      changeMode(){
        const mode = (this.mode + 1)%3;
        this.setMode(mode);

        console.log(this.sequenceList)
        let list = null;
        if (this.mode === 0){

        }else if (this.mode === 1){
          list = this.sequenceList
        }else {
          list = randomArray(this.sequenceList)
        }
        console.log(list)
        this.reactCurrentIndex(list);
        this.setPlayList(list);
      },
      //切换随机模式时，改变随机数列当前的播放序号
      reactCurrentIndex(list){
        console.log(list)
        let index = list.findIndex((item)=>{
          console.log(item)
          return item.songId === this.currentSong.songId
        });
        this.setCurrentIndex(index)
      },
      ...mapMutations({
        setFullPage: 'SET_FULL_PAGE',
        setPlaying: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setMode: 'SET_MODE',
        setPlayList: 'SET_PLAY_LIST'
      })
    }
  }
</script>
<!--
    data(){
      return {}
    },
    components: {},
    created(){},
    mounted(){},
    watch: {},
    filters: {},
    methods: {}
-->
