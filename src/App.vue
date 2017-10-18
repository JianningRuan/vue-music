<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import './assets/style/index.scss'
  import './assets/libs/icon/iconfont.css'

  import MHeader from './components/head/head.vue'
  import player from './components/player/player'
  export default {
    name: 'app',
    components: {
      MHeader,
      player
    }
  }
</script>
