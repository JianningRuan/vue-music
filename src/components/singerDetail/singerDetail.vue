<template>
  <transition name="slide">
    <music-list :songList="songList" :title="title" :bg-image="bgImage"></music-list>
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
    computed: {
      bgImage(){
        return this.singer.headPic
      },
      ...mapGetters([
        'singer'
      ])
    },
    data(){
      return {
        title: '',
        //singer: {},
        songList: []
      }
    },
    components: {
      CHeader,
      musicList
    },
    created(){
      console.log(this.singer)
    },
    mounted(){
      if (!this.singer.id){
        this.$router.push('/singer')
        return
      }
      this.$nextTick(() => {
        //this.singer = this.$store.state.singer
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
  }
</script>
