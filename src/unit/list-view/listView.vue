<template>
  <div class="main relative">
    <scroll ref="scroll" :listenScroll="true" :probeType="probeType" @scroll="listenScroll">
      <div>
        <div class="singer-box" ref="singerBox" v-for="singer in data">
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
        <li v-for="(letter, index) in shortCutList" :data-index="index" :class="{ 'current': currentIndex === index}">{{letter}}</li>
      </ul>
    </div>
    <div class="list-tit-fixed" ref="listTitFixed" v-show="currentLetter">{{currentLetter}}</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import './listView.scss'
  import scroll from './../../unit/scroll/scroll'

  const letterHeight = 24;
  const letterTitHeight = 18;

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data(){
      return {
        scrollY: -1, //y轴滚动的位置
        currentIndex: 0, //初始化到快速导航的第一个
        titTop: -1 //字母标题的偏移量
      }
    },
    components: {
      scroll
    },
    created(){
      this.touch = {};
      this.probeType = 3;
      this.singerListHeight = [];
    },
    mounted(){},
    activated(){},
    watch: {
      data(){
        this.$nextTick(()=>{
          this._setListHeight()
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
          let startHeight = this.singerListHeight[i];
          let endHeight = this.singerListHeight[i + 1];
          if (-newY >= startHeight && -newY < endHeight ){
            this.currentIndex = i;
            this.titTop = endHeight + newY;
            return
          }
        }
        //当newY到底
        this.currentIndex = this.singerListHeight.length - 2
      },
      titTop(newTop){
        let fixedTop = (newTop > 0 && newTop < letterTitHeight) ? newTop - letterTitHeight : 0;
        //减少dom操作
        if (this.fixedTop === fixedTop){
          return
        }
        this.fixedTop = fixedTop;
        this.$refs.listTitFixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }
    },
    computed: {
      shortCutList(){
        return this.data.map((item)=>{
          return item.title.substring(0,1)
        })
      },
      currentLetter(){
        //当拉到最顶部的时候
        if (this.scrollY > 0){
          return ''
        }
        if (this.data[this.currentIndex]){
          return this.data[this.currentIndex].title
        }else {
          return ''
        }
      }
    },
    filters: {},
    methods: {
      loadImage(){
        this.$refs.scroll.refresh();
      },
      //选择歌手
      selectSinger(singer){
        console.log(singer)
        this.$emit('selectItem', singer)
      },
      touchStartShortCut(e){
        this.touch.nowIndex = parseInt(getData(e.target, 'index'));
        this.touch.y1 = e.touches[0].pageY;
        this._scrollTo(this.touch.nowIndex)
      },
      touchMoveShortCut(e){
        this.touch.y2 = e.touches[0].pageY;
        let nowList = (this.touch.y2 - this.touch.y1) / letterHeight | 0;
        let currentIndex = nowList + this.touch.nowIndex;
        this.currentIndex = currentIndex;
        this._scrollTo(currentIndex)
      },
      listenScroll(pos){
        this.scrollY = pos.y;
      },
      _scrollTo(index){
        let allSingerTit = this.$refs.singerTit;
        let nowIndex = 0;
        if (index < 0){
          nowIndex = 0
        }else if (index > allSingerTit.length - 2){
          nowIndex = allSingerTit.length - 1
        }else {
          nowIndex = index
        }
        this.currentIndex = nowIndex;
        this.$refs.scroll.scrollToElement(allSingerTit[nowIndex], 0)
      },
      _setListHeight(){
        const singerBox = this.$refs.singerBox;
        let height = 0;
        this.singerListHeight.push(height);
        for (let i = 0, l = singerBox.length; i < l; i++){
          height += singerBox[i].clientHeight + 10; //+10是因为margin-bottom=10
          this.singerListHeight.push(height)
        }
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
    activated(){},
    watch: {},
    filters: {},
    methods: {}
-->
