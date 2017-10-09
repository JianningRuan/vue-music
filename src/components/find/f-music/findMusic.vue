<template>
  <div class="find-box">

    <div class="banner" ref="f-banner" v-if="sliderArray.length">
      <slider :loop="true" :autoPlay="true">
        <li v-for="(slider, index) in sliderArray">
          <img v-bind:src="slider.picUrl" />
        </li>
      </slider>
    </div>

    <!--推荐歌单-->
    <div class="session-tit">
      <a>推荐歌单<span></span></a>
    </div>
    <div class="session-box disc-recommend">
      <div class="disc" v-for="disc in discArray">
        <div class="disc-pic">
          <img v-bind:src="disc.imgurl"/>
        </div>
        <div class="disc-name">
          {{disc.dissname}}
        </div>
      </div>
    </div>
    <!--推荐歌单-end-->

  </div>
</template>
<script>
  import './findMusic.scss'
  import { getRecommend, getDiscByTag } from './../../../api/recommend'
  import slider from './../../../unit/slider/slider'
  export default {
    data(){
      return {
        sliderArray: [], //轮播图数组
        discArray: [] //推荐歌单数组
      }
    },
    components: {
      slider
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
            //this.discArray = res.data.
          }
        })
      },
      _getDiscByTag(){
        getDiscByTag().then((res) => {
          if (res.code === 0){
            this.discArray = res.data.list
          }

          console.log(res)
        })
      }
    }
  }
</script>
