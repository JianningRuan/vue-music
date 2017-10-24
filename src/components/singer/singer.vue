<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <c-header :title="title"></c-header>
      <div class="main">
        <scroll ref="scroll" :listenScroll="true" :probeType="probeType" @scroll="listenScroll">
          <div>
            <div class="singer-box" ref="singerBox" v-for="singer in singerList">
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
        <div class="short-cut-list" @touchstart="touchStartShortCut" @touchmove.stop.prevent="touchMoveShortCut">
          <ul>
            <li v-for="(letter, index) in shortCutList" :data-index="index" v-bind:class="{ 'current': currentIndex === index}">{{letter}}</li>
          </ul>
        </div>
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

  const letterHeight = 24;

  export default {
    data(){
      return {
        title: '歌手',
        singerList: [],
        indexList: [],
        scrollY: -1, //y轴滚动的位置
        currentIndex: 0 //初始化到快速导航的第一个
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
    created(){
      this.touch = {};
      this.probeType = 3;
      this.singerListHeight = [];
    },
    mounted(){
      this.$nextTick( ()=>{
        getSinger().then((res)=>{
          this.singerList = this.crateSingerList(res.data.list);
        })
      })
    },
    watch: {
      singerList(val){
        this.$nextTick(()=>{
          this._setListHeight()
          //this.$refs.singerBox
        })
      },
      scrollY(newY){
        //当newY > 0
        if (newY > 0){
          this.currentIndex = 0;
          return
        }
        //当newY 在数组中间
        for (let i = 0, l = this.singerListHeight.length - 1; i < l; i++){
          let startHeight = this.singerListHeight[i]
          let endHeight = this.singerListHeight[i + 1]
          if (-newY >= startHeight && -newY < endHeight ){
            this.currentIndex = i
            return
          }
        }
        //当newY到底
        this.currentIndex = this.singerListHeight.length - 2
      }
    },
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
        this.touch.nowIndex = parseInt(getData(e.target, 'index'))
        this.touch.y1 = e.touches[0].pageY
        this._scrollTo(this.touch.nowIndex)
      },
      touchMoveShortCut(e){
        this.touch.y2 = e.touches[0].pageY
        let nowList = (this.touch.y2 - this.touch.y1) / letterHeight | 0
        this._scrollTo(nowList + this.touch.nowIndex)
      },
      listenScroll(pos){
        console.log(pos)
        this.scrollY = pos.y;
      },
      _scrollTo(index){
        this.$refs.scroll.scrollToElement(this.$refs.singerTit[index], 0)
      },
      _setListHeight(){
        const singerBox = this.$refs.singerBox;
        let height = 0;
        this.singerListHeight.push(height)
        for (let i = 0, l = singerBox.length; i < l; i++){
          let thisHeight = singerBox[i].clientHeight;
          height += thisHeight
          this.singerListHeight.push(height)
        }
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>
