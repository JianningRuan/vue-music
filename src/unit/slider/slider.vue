<template>
  <div class="slider" ref="sliderBox">
    <ul class="slider-wrapper" ref="sliderWrapper">
      <slot></slot>
    </ul>
    <ul class="dots">
      <li class="dot" v-for="(dot, index) in dots" v-bind:class="{ 'current': index === currentBannerIndex }"></li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import './slider.scss'
  import BScroll from 'better-scroll'
  import { addClass } from './../../assets/js/common'
  export default {
    props: {
      loop: { //循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: {//自动播放
        type: Boolean,
        default: true
      },
      interval: { //自动播放间隔
        type: Number,
        default: 4000
      }
    },
    data(){
      return {
        dots: [],
        currentBannerIndex: 0
      }
    },
    mounted(){
      this.$nextTick( ()=>{
        this._initParam();
        this._initSlider();
        if (this.autoPlay){
          this._play();
        }
        window.addEventListener('resize', ()=>{
          if (!this.slider){
            return
          }
          this._initParam(true);
          this.slider.refresh()
        })
      })
    },
    methods: {
      _initParam(isResize){
        this.sliderBox = this.$refs.sliderBox;
        let sliderBoxWidth = this.sliderBox.clientWidth;
        //获取轮播图的子元素
        this.sliderDom = this.$refs.sliderWrapper;
        let wrapperWidth = 0;
        this.sliderChildren = this.sliderDom.children;
        for (let i = 0, sLength = this.sliderChildren.length; i < sLength; i++){
          addClass(this.sliderChildren[i], 'slider-item');
          this.sliderChildren[i].style.width = sliderBoxWidth + 'px';
          wrapperWidth += sliderBoxWidth
        }
        //因为如果循环播放的话，前后各增加一个子元素
        if (this.loop && !isResize){
          wrapperWidth += 2 * sliderBoxWidth
        }
        //计算总宽度
        this.sliderDom.style.width = wrapperWidth + 'px';
      },
      _initSlider(){
        //渲染banner导航
        this.dots = new Array(this.sliderChildren.length);
        //初始化幻灯片
        this.slider = new BScroll(this.$refs.sliderBox, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop
          },
          snapThreshold: 0.3,
          snapSpeed: 400
        });
        //监听banner的滚动
        this.slider.on('scrollEnd', ()=> {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop){
            pageIndex -= 1;
          }
          this.currentBannerIndex = pageIndex;

          if (this.autoPlay){
            clearTimeout(this.timer);
            this._play()
          }
        })
      },
      _play(){
        //如果自动播放
        if(this.autoPlay){
          let pageIndex = this.currentBannerIndex + 1;
          if (this.loop){
            pageIndex += 1;
          }
          this.timer = setTimeout(()=>{
            this.slider.goToPage(pageIndex, 0, 400);
          }, this.interval)
        }
      }
    },
    destroyed(){
      clearTimeout(this.timer)
    }
  }
</script>
