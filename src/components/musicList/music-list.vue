<template>
  <div class="pos-wrapper music-list">
    <div class="m-head">
      <a class="back" @click="back">
        <i class="iconfont icon-left"></i>
      </a>
      <h1>{{title}}</h1>
    </div>
    <div class="bg-image" ref="bgImage" :style="setBgImage">
      <div class="filer"></div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <scroll ref="scroll" :probeType="probeType" :listenScroll="listenScroll" :data="songList" @scroll="toScroll">
      <song-list class="list" ref="list" :songList="songList" @select="selectItem"></song-list>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import './music-list.scss'
  import scroll from './../../unit/scroll/scroll'
  import songList from './../../unit/songList/song-list'
  import { mapActions } from 'vuex'

  const headHeight = 50;

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      bgImage: {
        type: String,
        default: ''
      },
      songList: {
        type: Array,
        default: []
      }
    },
    components: {
      scroll,
      songList
    },
    watch:{
      songList(){
        this.$refs.scroll.refresh();
      },
      scrollY(newY){
        //console.log(newY)
        let translateY = Math.max(-this.bgImageTop + headHeight, newY)
        console.log(translateY)
        let bgImage = this.$refs.bgImage
        if (newY < translateY){
          bgImage.style.zIndex = 6;
          bgImage.style.paddingTop = 0;
          bgImage.style.height = `${headHeight}px`
        }else {
          bgImage.style.zIndex = 0;
          bgImage.style.paddingTop = '70%';
          bgImage.style.height = 0
        }
        this.$refs.bgLayer.style.transform = `translate3d(0,${translateY}px,0)`
      }
    },
    data(){
      return {
        scrollY: 0
      }
    },
    created(){
      this.probeType = 3;
      this.listenScroll = true;
    },
    mounted(){
      this.$nextTick(()=>{
        this.setTop();
      })
    },
    methods: {
      back(){
        this.$router.back()
      },
      setTop(){
        this.bgImageTop = this.$refs.bgImage.clientHeight;
        this.$refs.list.$el.style.top = `${this.bgImageTop}px`
      },
      selectItem(song, index){
        console.log(song)
        this.playSelect({
          list: this.songList,
          index: index
        })
      },
      toScroll(pos){
        //console.log(pos)
        this.scrollY = pos.y
      },
      ...mapActions([
        'playSelect'
      ])
    },
    computed: {
      setBgImage(){
        return `background-image: url(${this.bgImage})`
      }
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
