<template>
  <div class="player" v-show="playList.length">
    <!--全屏播放器-->
    <div class="pos-wrapper full-page-player" v-show="fullPage">
      <div class="m-head">
        <div class="back" @click="closePlayer">&lt;</div>
        <h1></h1>
      </div>
    </div>
    <!--全屏播放器-end-->
    <!--迷你播放器-->
    <div class="pos-bottom-wrapper mini-player" v-show="!fullPage" @click="openPlayer">2</div>
    <!--迷你播放器-end-->
  </div>
</template>
<script type="text/ecmascript-6">
  import './player.scss'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'fullPage',
        'playList'
      ])
    },
    methods: {
      closePlayer(){
        this.setFullPage(false)
      },
      openPlayer(){
        this.setFullPage(true)
      },
      ...mapMutations({
        setFullPage: 'SET_FULL_PAGE'
      })
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
    watch: {},
    filters: {},
    methods: {}
-->
