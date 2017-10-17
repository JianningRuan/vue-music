<template>
  <div class="pos-wrapper music-list">
    <div class="m-head">
      <div class="back" @click="back">&lt;</div>
      <h1>{{title}}</h1>
    </div>
    <div class="bg-image">
      <div class="filer"></div>
    </div>
    <scroll :data="songList">
      <song-list :songList="songList"></song-list>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import './music-list.scss'
  import scroll from './../../unit/scroll/scroll'
  import songList from './../../unit/songList/song-list'
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
    methods: {
      back(){
        this.$router.back()
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
