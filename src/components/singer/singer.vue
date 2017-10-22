<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <c-header :title="title"></c-header>
      <div class="main">
        <scroll ref="scroll">
          <div>
            <div class="singer-box" v-for="singer in singerList">
              <div class="singer-tit" ref="singerTit">{{singer.title}}</div>
              <div class="singer-list">
                <div class="singer-item" v-for="singerItem in singer.item" @click="selectSinger(singerItem)">
                  <div class="singer-pic">
                    <img @load="loadImage" v-lazy="singerItem.headPic"/>
                  </div>
                  <div class="singer-cont">{{singerItem.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </scroll>
      </div>
      <div class="short-cut-list" @touchstart="touchStartShortCut">
        <ul>
          <li v-for="(letter, index) in shortCutList">{{letter}}</li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './singer.scss'
  import CHeader from './../c-head/c-head'
  import { getSinger } from './../../api/recommend'
  import { singer, getData } from  './../../assets/js/common'
  import { mapMutations } from 'vuex'
  import scroll from './../../unit/scroll/scroll'

  export default {
    data(){
      return {
        title: '歌手',
        singerList: [],
        indexList: []
      }
    },
    computed: {
      shortCutList(){
        return this.singerList.map((item)=>{
          return item.title.substring(0,1)
        })
      }
    },
    components: {
      CHeader,
      scroll
    },
    created(){},
    mounted(){
      this.$nextTick( ()=>{
        getSinger().then((res)=>{
          console.log(res)
          this.singerList = this.crateSingerList(res.data.list);
          console.log(this.singerList)
        })
      })
    },
    watch: {},
    filters: {},
    methods: {
      //
      loadImage(){
        this.$refs.scroll.refresh();
      },
      //创建歌手列表格式
      crateSingerList(list){
        let map = {
          hot: {
            title: '热门',
            item: []
          }
        }
        list.forEach((item, index)=>{
          if (index < 10){
            map.hot.item.push( new singer({
              id: item.Fsinger_id,
              mid: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          let key = item.Findex;
          if (!map[key]){
            map[key] = {
              title: key,
              item: []
            }
          }
          map[key].item.push( new singer({
            id: item.Fsinger_id,
            mid: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        //排序
        let hot = [];
        let ret = [];
        for (let key in map){
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if (val.title == '热门'){
            hot.push(val)
          }
        }
        ret.sort((a, b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      //选择歌手
      selectSinger(singer){
        console.log(singer)
        this.$router.push({
          path: `/singer/${singer.mid}`
        })
        //this.$store.commit('setSinger', singer)
        this.setSinger(singer)
      },
      touchStartShortCut(e){
        let nowIndex = getData(e.target, 'index')
        this.$refs.scroll.scrollToElement(this.$refs.singerTit[nowIndex], 0)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>
