<template>
  <div class="s-wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {//滚动速度
        type: Number,
        default: 1
      },
      click: {//是否允许点击
        type: Boolean,
        default: true
      },
      data: {//传进的数据
        type: Array,
        default: null
      },
      listenScroll: {//是否监听滚动
        type: Boolean,
        default: false
      },
      pullUp: {//是否监听滚动到底
        type: Boolean,
        default: false
      }
    },
    mounted (){
      this.$nextTick( () => {
        this.initScroll();
      })
    },
    methods: {
      initScroll(){
        if (!this.$refs.wrapper){
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        });
        if (this.listenScroll){
          this.scroll.on('scroll', (pos)=>{
            this.$emit('scroll', pos)
          })
        }
        if (this.pullUp){
          this.scroll.on('scrollEnd', ()=>{
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)){
              this.$emit('scrollToEnd')
            }
          })
        }
        this.scroll.on('pullingDown', ()=>{
        })
      },
      refresh(){//重置
        this.scroll.refresh();
      },
      scrollTo(){//滚动到
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement(){//滚动到指定元素
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data: function () {
        this.$nextTick( () => {
          this.refresh();
        })
      }
    }
  }
</script>
<style type="text/css" scoped lang="scss">
  .s-wrapper {
    overflow: hidden;
    height: 100%;
  }
</style>
