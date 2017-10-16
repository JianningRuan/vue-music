<template>
  <div class="pos-wrapper flex-column">
    <c-header :title="title"></c-header>
  </div>
</template>
<script type="text/ecmascript-6">
  import './singerDetail.scss'
  import CHeader from './../c-head/c-head'
  export default {
    data(){
      return {
        title: '',
        singer: {}
      }
    },
    components: {
      CHeader
    },
    created(){},
    mounted(){
      this.singer = this.$store.state.singer
      this.title = this.singer.name
      console.log(this.singer)
    },
    watch: {},
    filters: {},
    methods: {}
  }
</script>
