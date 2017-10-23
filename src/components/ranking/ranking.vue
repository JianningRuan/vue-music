<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <c-header :title="title"></c-header>
      <div class="main">
        <scroll ref="scroll">
          <div>
            <div class="ranking-box" v-for="ranking in rankingList" @click="selectItem(ranking.id)">
              <div class="ranking-pic">
                <img @load="loadImage" v-lazy="ranking.picUrl"/>
              </div>
              <div class="ranking-cont">
                <div class="title">{{ranking.topTitle}}</div>
                <ul>
                  <li v-for="(song, sIndex) in ranking.songList">{{sIndex + 1}}.{{song.songname}}</li>
                </ul>
              </div>
            </div>
          </div>
        </scroll>
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './ranking.scss'
  import CHeader from './../c-head/c-head'
  import scroll from './../../unit/scroll/scroll'
  import { getRanking } from './../../api/recommend'

  export default {
    data(){
      return {
        title: '排行榜',
        rankingList: []
      }
    },
    components: {
      CHeader,
      scroll
    },
    created(){},
    mounted(){
      getRanking().then((res)=>{
        console.log(res)
        if (res.code === 0){
          this.rankingList = res.data.topList
        }
      })
    },
    activated(){},
    watch: {},
    filters: {},
    methods: {
      loadImage(){
        this.$refs.scroll.refresh();
      },
      selectItem(topId){
        console.log('v');
        this.$router.push({
          path: `/ranking/${topId}`
        })
      }
    }
  }
</script>
