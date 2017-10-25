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
    <scroll ref="scroll" :data="songList">
      <song-list class="list" ref="list" :songList="songList" @select="selectItem"></song-list>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import './music-list.scss'
  import scroll from './../../unit/scroll/scroll'
  import songList from './../../unit/songList/song-list'
  import { mapActions } from 'vuex'
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
        console.log('ll')
        this.$refs.scroll.refresh();
      }
    },
    created(){},
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
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
      },
      selectItem(song, index){
        console.log(song)
        this.playSelect({
          list: this.songList,
          index: index
        })
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
