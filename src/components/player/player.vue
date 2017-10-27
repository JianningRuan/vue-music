<template>
  <div class="player" v-show="playList.length">
    <!--全屏播放器-->
    <div class="pos-wrapper full-page-player play-bg" v-show="fullPage">
      <div class="play-bg-layer">
        <img width="100%" height="100%" :src="currentSong.image"/>
      </div>
      <div class="top">
        <div class="back" @click="closePlayer"><i class="iconfont icon-down"></i></div>
        <h1></h1>
        <p></p>
      </div>
      <div class="middle">

      </div>
      <div class="bottom">
        <div class="slider-nav"></div>
        <div class="progress-wrapper"></div><!--进度条-->
        <div class="opa-nav">
          <a href=""></a><a href=""></a><a href=""></a><a href=""></a><a href=""></a>
        </div><!--操作按钮-->
      </div>
    </div>
    <!--全屏播放器-end-->
    <!--迷你播放器-->
    <div class="pos-bottom-wrapper mini-player" v-show="!fullPage" @click="openPlayer"></div>
    <!--迷你播放器-end-->
    <audio ref="audio" :src="currentSong.url"></audio>
  </div>
</template>
<script type="text/ecmascript-6">
  import './player.scss'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'fullPage',
        'playList',
        'currentIndex'
      ])
    },
    watch: {
      currentIndex(newVal){
        this.currentSong = this.playList[newVal]
      },
      currentSong(newVal){
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
      ...mapMutations({
        setFullPage: 'SET_FULL_PAGE'
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
