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
        <div class="middle" @touchstart.prevent="middleTouchStart" @touchmove.prevent="middleTouchMove" @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleLeft">
            <div class="cd-wrapper">
              <div class="cd" :class="cdClass">
                <img :src="currentSong.image"/>
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <p class="playing-lyric">{{currentLyricLine}}</p>
            </div>
          </div>
          <scroll ref="lyricScroll" class="middle-r" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div class="lyric-box" v-if="currentLyric">
                <p ref="line" :class="{'current': currentLyricNum === index}" v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="slider-nav">
            <span class="dot" :class="{'active': currentShow == 'cd'}"></span>
            <span class="dot" :class="{'active': currentShow == 'lyric'}"></span>
          </div>
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
  import Scroll from './../../unit/scroll/scroll'
  import { mapGetters, mapMutations } from 'vuex'
  import { randomArray, prefixStyle } from './../../assets/js/common';
  import { playMode } from './../../assets/js/config'
  //import Base64 from 'js-base64'
  import Lyric from 'lyric-parser'
  export default {
    components: {
      progressBar,
      progressCircle,
      Scroll
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
        if (newVal.songId === oldVal.songId){
          return
        }
        //切换的时候，先销毁歌词
        if (this.currentLyric){
          this.currentLyric.stop();
        }
        //播放
        /*this.$nextTick(()=>{

        })*/
        setTimeout(()=>{
          this.setPlaying(true);
          this.play();
          //获取歌词
          this.getLyric();
        }, 1000)
      },
      currentLyric(newVal){
        //console.log(newVal)
      },
      playing(newPlaying){
        this.$nextTick(()=>{
          newPlaying ? this.play() : this.pause();
          //当歌曲暂停或播放时，歌词相对暂停或播放
          if (this.currentLyric){
            this.currentLyric.togglePlay();
          }
        })
      }
    },
    data(){
      return {
        loadReady: false,
        //currentSong: {},
        currentTime: 0,
        radius: 32,
        currentLyric: null,
        currentLyricNum: 0,
        currentShow: 'cd', //cd表示第一面，lyric表示第二面,
        currentLyricLine: ''
      }
    },
    created(){
      this.touch = {};
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
        //如果歌单列表只有一首歌
        if (this.playList.length === 1){
          this.loop();
        }else {
          let index = this.currentIndex - 1;
          if (index == -1){
            index = this.playList.length - 1;
          }
          this.setCurrentIndex(index);
          this.loadReady = false
        }

      },
      //下一首
      next(){
        if (!this.loadReady){
          return
        }
        //如果歌单列表只有一首歌
        if (this.playList.length === 1){
          this.loop()
        }else {
          let index = this.currentIndex + 1;
          if (index === this.playList.length){
            index = 0;
          }
          this.setCurrentIndex(index);
          this.loadReady = false
        }
      },
      //监听播放完执行
      end(){
        if (this.mode === playMode.loop){
          this.loop();
        }else {
          this.next();
        }
      },
      loop(){
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
        //this.play()

        if (this.currentLyric){
          this.currentLyric.seek(0)
        }
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
          this.setPlaying(true)
        }

        if (this.currentLyric){
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      //切换播放模式
      changeMode(){
        const mode = (this.mode + 1)%3;
        this.setMode(mode);

        let list = null;
        if (this.mode === playMode.random){
          list = randomArray(this.sequenceList)
        }else {
          list = this.sequenceList
        }
        this.reactCurrentIndex(list);
        this.setPlayList(list);
      },
      //切换随机模式时，改变随机数列当前的播放序号
      reactCurrentIndex(list){
        let index = list.findIndex((item)=>{
          return item.songId === this.currentSong.songId
        });
        this.setCurrentIndex(index)
      },
      //获取歌词
      getLyric(){
        this.currentSong.getSongLyricH5().then((lyric)=>{
          this.currentLyric = new Lyric(lyric, this.handleLyric);
          if (this.playing){
            this.currentLyric.play();
          }
        }).catch(()=>{
          this.currentLyric = null;
          this.currentLyricLine = '';
          this.currentLyricNum = 0;
        })
      },
      handleLyric({lineNum, txt}){
        console.log(lineNum);
        this.currentLyricNum = lineNum;
        console.log(this.$refs.line);
        if (lineNum > 5){
          let lineEle = this.$refs.line[lineNum - 5];
          this.$refs.lyricScroll.scrollToElement(lineEle, 1000);
        }else {
          this.$refs.lyricScroll.scrollTo(0, 0, 1000);
        }

        this.currentLyricLine = txt;
      },
      //监听切换cd与歌词
      middleTouchStart(e){
        this.touch.initiated = true;
        let touch = e.touches[0];
        this.touch.startX = touch.pageX;
        this.touch.startY = touch.pageY;
      },
      middleTouchMove(e){
        if (!this.touch.initiated){
          return
        }
        const touch = e.touches[0];
        const deltaX = touch.pageX - this.touch.startX;
        const deltaY = touch.pageY - this.touch.startY;
        //如果纵向滚动大于横向滚动的绝对值，就退出
        if (Math.abs(deltaX) < Math.abs(deltaY)){
          return
        }
        //计算middle-r滑动的值
        let winWidth = window.innerWidth;
        let offsetLeft = this.currentShow === 'cd' ? 0 : -winWidth;
        //console.log(offsetLeft +','+ deltaX);
        let offsetWidth = Math.min(0, Math.max(-winWidth, offsetLeft + deltaX));
        this.$refs.lyricScroll.$el.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
        this.$refs.lyricScroll.$el.style.transitionDuration = 0;
        this.$refs.middleLeft.style.opacity = 1 - this.touch.percent;
        this.$refs.middleLeft.style.transitionDuration = 0;
        this.touch.percent = Math.abs(offsetWidth / winWidth);
      },
      middleTouchEnd(e){
        this.touch.initiated = false;

        let offsetWidth;
        let offsetOpacity;
        let winWidth = window.innerWidth;
        if (this.currentShow == 'cd'){//当前显示的是cd的时候
          if (this.touch.percent >= 0.1){//大于10%就往左切换
            offsetWidth = -window.innerWidth;
            this.currentShow = 'lyric';
            offsetOpacity = 0
          }else {
            offsetWidth = 0;
            offsetOpacity = 1
          }
        }else {//当前显示是歌词的时候
          if (this.touch.percent < 0.9){
            offsetWidth = 0;
            this.currentShow = 'cd';
            offsetOpacity = 1
          }else {
            offsetWidth = -winWidth;
            offsetOpacity = 0
          }
        }
        const timer = 300;
        this.$refs.lyricScroll.$el.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
        this.$refs.lyricScroll.$el.style.transitionDuration = `${timer}ms`;
        this.$refs.middleLeft.style.opacity = offsetOpacity;
        this.$refs.middleLeft.style.transitionDuration = `${timer}ms`;
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
