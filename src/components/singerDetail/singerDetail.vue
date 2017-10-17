<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <c-header :title="title"></c-header>
      <div class="main">
        <div class="singer-fever">
          <img :src="singer.headPic"/>
        </div>
        <div class="recommend-list">
          <ul>
            <li v-for="song in songList">
              <h2>{{song.songName}}</h2>
              <p>{{song.singer}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './singerDetail.scss'
  import CHeader from './../c-head/c-head'
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
      CHeader
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
