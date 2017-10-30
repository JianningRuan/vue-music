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
          <div class="progress-wrapper"></div><!--进度条-->
          <div class="opa-nav">
            <a class="opa-btn iconfont icon-random-play"></a>
            <a class="opa-btn iconfont icon-prev"></a>
            <a class="play-btn iconfont" :class="playIcon" @click="playBtn"></a>
            <a class="opa-btn iconfont icon-next"></a>
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
        <div class="mini-opa-btn iconfont" :class="playIcon" @click.stop.prevent="playBtn"></div>
        <div class="mini-opa-btn"></div>
      </div>
    </transition>
    <!--迷你播放器-end-->
    <audio ref="audio" :src="currentSong.url"></audio>
  </div>
</template>
<script type="text/ecmascript-6">
  import './player.scss'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      playIcon(){
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      cdClass(){
        return this.playing ? 'play' : 'pause'
      },
      ...mapGetters([
        'fullPage',
        'playList',
        'currentIndex',
        'playing'
      ])
    },
    watch: {
      currentIndex(newVal){
        this.currentSong = this.playList[newVal]
      },
      currentSong(newVal){
        //播放
        this.$nextTick(()=>{
          this.setPlaying(true)
          this.play();
        })
      },
      playing(newPlaying){
        if (newPlaying){
          this.play();
        }else {
          this.pause();
        }
      }
    },
    data(){
      return {
        currentSong: {}
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
      ...mapMutations({
        setFullPage: 'SET_FULL_PAGE',
        setPlaying: 'SET_PLAYING'
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
