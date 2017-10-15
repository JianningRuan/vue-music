<template>
  <div class="find-box">
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
          <router-link to="/singer">歌手</router-link>
          <router-link to="/ranking">排行</router-link>
          <router-link to="/classify-disc">分类歌单</router-link>
        </div>
        <!--nav-end-->
        <!--推荐歌单-->
        <div class="session-tit">
          <a>推荐歌单<span></span></a>
        </div>
        <div class="session-box disc-recommend">
          <div class="disc" v-for="disc in discArray">
            <div class="disc-pic">
              <img  @load="loginImage" v-lazy="disc.imgurl"/>
            </div>
            <div class="disc-name">
              {{disc.dissname}}
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
  import slider from './../../../unit/slider/slider' //轮播图插件
  import scroll from './../../../unit/scroll/scroll' //滚动插件
  import loading from './../../../unit/loading/loading' //loading插件
  export default {
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
    created: function () {

    },
    mounted: function () {
      this.$nextTick(function () {
        this._getRecommend();
        this._getDiscByTag();
      })
    },
    methods: {
      _getRecommend(){
        getRecommend().then((res) => {
          if (res.code === 0 ){
            console.log(res.data);
            this.sliderArray = res.data.slider;
          }
        })
      },
      _getDiscByTag(){
        getDiscByTag().then((res) => {
          if (res.code === 0){
            this.discArray = res.data.list
          }
        })
      },
      loginImage(){
        this.$refs.scrollWrapper.refresh();
      },
      //监听滚动
      listenScroll(data){
        console.log(data);
        let aa = this.$refs.content.clientHeight;
        console.log(aa);
      },
      toEnd(){
        console.log('到底了');
      }
    }
  }
</script>
