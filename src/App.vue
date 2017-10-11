<template>
  <div id="app">
    <m-header></m-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import './assets/style/index.scss'
  import MHeader from './components/head/head.vue'
  export default {
    name: 'app',
    components: {
      MHeader
    }
  }
</script>
