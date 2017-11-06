<template>
  <music-list :songList="songList" :bgImage="disc.picUrl" :title="disc.songListDesc"></music-list>
</template>
<script type="text/ecmascript-6">
  import './disc.scss'
  import { getDiscDetail } from './../../api/recommend'
  import { mapGetters } from 'vuex'
  import { createDiscSongList } from './../../assets/js/common'
  import musicList from './../musicList/music-list'
  export default {
    computed: {
      ...mapGetters([
        'disc'
      ])
    },
    data(){
      return {
        disstId: '',
        cdList: '',
        songList: [],
        bgImage: ''
      }
    },
    components: {
      musicList
    },
    created(){},
    mounted(){

    },
    activated(){
      console.log('chufa');
      this._getDiscDetail()
    },
    methods: {
      _getDiscDetail(){
        console.log(this.disc)
        //const disstId = this.$route.params.id;
        getDiscDetail(this.disc.id).then((res)=>{
          console.log(res)
          if (res.code === 0){
            this.cdList = res.cdlist[0]
            this.songList = createDiscSongList(this.cdList.songlist)
          }
        })
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
