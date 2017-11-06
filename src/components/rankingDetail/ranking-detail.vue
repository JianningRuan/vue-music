<template>
  <div class="pos-wrapper flex-column">
    <music-list :songList="songList" :bgImage="bgImage" :title="title"></music-list>
  </div>
</template>
<script type="text/ecmascript-6">
  import './ranking-detail.scss'
  import { getRankingDetail } from './../../api/recommend'
  import { createRankSongList } from './../../assets/js/common'
  import musicList from './../musicList/music-list'

  export default {
    data(){
      return {
        songList: [],
        bgImage: '',
        title: ''
      }
    },
    components: {
      musicList
    },
    created(){},
    mounted(){
      var rankId = this.$route.params.id;
      getRankingDetail(rankId).then((res)=>{
        console.log(res)
        if (res.code === 0){
          this.songList = createRankSongList(res.songlist);
          this.bgImage = res.topinfo.pic;
          this.title = res.topinfo.ListName
        }
      })
    },
    activated(){},
    watch: {},
    filters: {},
    methods: {}
  }
</script>
<!--
    data(){
      return {}
    },
    components: {},
    created(){},
    mounted(){},
    activated(){},
    watch: {},
    filters: {},
    methods: {}
-->
