<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <c-header :title="title"></c-header>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './singerDetail.scss'
  import CHeader from './../c-head/c-head'
  import { mapGetters } from 'vuex'
  import { getSingerRecommend } from './../../api/recommend'
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
      this.$nextTick(() => {
        this.singer = this.$store.state.singer
        this.title = this.singer.name
        console.log(this.singer)

        getSingerRecommend(this.singer.mid).then((res)=>{
          console.log(res)
        })
      })
    },
    watch: {},
    filters: {},
    methods: {}/*,
    computed: {
      ...mapGetters([
        'singer'
      ])
    }*/
  }
</script>
