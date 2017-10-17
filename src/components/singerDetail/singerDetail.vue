<template>
  <transition name="slide">
    <music-list :songList="songList" :title="title"></music-list>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './singerDetail.scss'
  import CHeader from './../c-head/c-head'
  import musicList from './../musicList/music-list'
  import { mapGetters } from 'vuex'
  import { getSingerRecommend } from './../../api/recommend'
  import { crateSongList } from  './../../assets/js/common'
  export default {
    data(){
      return {
        title: '',
        singer: {},
        songList: []
      }
    },
    components: {
      CHeader,
      musicList
    },
    created(){},
    mounted(){
      this.$nextTick(() => {
        this.singer = this.$store.state.singer
        this.title = this.singer.name
        console.log(this.singer)

        getSingerRecommend(this.singer.mid).then((res)=>{
          console.log(res)
          if (res.code === 0){
            //let list = res.data.list;
            this.songList = crateSongList(res.data.list)
          }
        })
      })
    },
    watch: {},
    filters: {},
    methods: {}
      /*,
    computed: {
      ...mapGetters([
        'singer'
      ])
    }*/
  }
</script>
