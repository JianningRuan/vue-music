<template>
  <div class="s-wrapper" ref="sWrapper">
    <div class="s-content">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    created (){
      this.$nextTick( () => {
        this.initScroll();
      })
    },
    methods: {
      initScroll(){
        this.scroll = new BScroll(this.$refs.sWrapper, {
          scrollY: true,
          click: true
        })
      }
    }
  }
</script>
