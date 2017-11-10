<template>
  <div class="find-box" ref="findBox">
    <scroll ref="scrollWrapper" :listenScroll="true" :pullUp="true" v-on:scroll="listenScroll" v-on:scrollToEnd="toEnd">
      <div ref="content">
        <div class="banner" ref="f-banner" v-if="sliderArray.length">
          <slider :loop="true" :autoPlay="true">
            <li v-for="(slider, index) in sliderArray">
              <img @load="loginImage" v-bind:src="slider.picUrl" />
            </li>
          </slider>
        </div>

        <!--nav-->
        <div class="m-nav">
          <router-link to="/singer">
            <i class="icon iconfont icon-user"></i>
            <i>歌手</i>
          </router-link>
          <router-link to="/ranking">
            <i class="icon iconfont icon-ranking"></i>
            <i>排行</i>
          </router-link>
          <router-link to="/classifyDisc">
            <i class="icon iconfont icon-type"></i>
            <i>分类歌单</i>
          </router-link>
        </div>
        <!--nav-end-->
        <!--推荐歌单-->
        <div class="session-tit">
          <a>推荐歌单<span></span></a>
        </div>
        <div class="session-box disc-recommend">
          <div class="disc" v-for="disc in discArray" @click="selectItem(disc)">
            <div class="disc-pic">
              <img @load="loginImage" v-lazy="disc.picUrl"/>
            </div>
            <div class="disc-name">
              {{disc.songListDesc}}
            </div>
          </div>

          <!--loading-->
          <div class="loading-wrapper" v-show="!discArray.length">
            <loading></loading>
          </div>
          <!--loading-end-->
        </div>
        <!--推荐歌单-end-->
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import './findMusic.scss'
  import { getRecommend, getDiscByTag } from './../../../api/recommend'
  import { mapMutations } from 'vuex'
  import slider from './../../../unit/slider/slider' //轮播图插件
  import scroll from './../../../unit/scroll/scroll' //滚动插件
  import loading from './../../../unit/loading/loading' //loading插件
  import { playListMixin } from './../../../assets/js/mixin'
  export default {
    name: 'findMusic',
    mixins: [playListMixin],
    data(){
      return {
        sliderArray: [], //轮播图数组
        discArray: [] //推荐歌单数组
      }
    },
    components: {
      slider,
      scroll,
      loading
    },
    created: function () {},
    mounted: function () {
      this.$nextTick(function () {
        this._getRecommend();
        //this._getDiscByTag();
      })
    },
    methods: {
      _getRecommend(){
        getRecommend().then((res) => {
          if (res.code === 0 ){
            console.log(res.data);
            this.sliderArray = res.data.slider;

            this.discArray = res.data.songList
          }
        })
      },
      _getDiscByTag(){
        getDiscByTag().then((res) => {
          if (res.code === 0){
            console.log(res);
            this.discArray = res.data.list
          }
        })
      },
      loginImage(){
        this.$refs.scrollWrapper.refresh();
      },
      selectItem(disc){
        console.log(this);
        this.setDiscId(disc.id)
        this.$router.push({
          path: `/disc/${disc.id}`
        })

      },
      //监听滚动
      listenScroll(data){
        //console.log(data);
        //let aa = this.$refs.content.clientHeight;
      },
      toEnd(){
        //console.log('到底了');
      },
      handlePlaylist(playlist){
        console.log(playlist);
        let bottom = playlist.length > 0 ? '60px' : 0;
        this.$refs.findBox.style.paddingBottom = bottom;
        if (playlist.length > 0){
          this.$refs.scrollWrapper.refresh();
        }
      },
      ...mapMutations({
        setDiscId: 'SET_DISC_ID'
      })
    }
  }
</script>
