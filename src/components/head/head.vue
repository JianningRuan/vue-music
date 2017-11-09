<template>
  <div class="head">
    <div class="nav">
      <router-link to="/music">我的</router-link>
      <router-link to="/find">发现</router-link>
      <router-link to="/trends">动态</router-link>
    </div>
    <a class="menu"><i class="iconfont icon-menu"></i></a>
    <router-link class="search-btn" to="/search"><i class="iconfont icon-search"></i></router-link>
  </div>
</template>

<script>
  import './head.scss'
  export default {
    name: 'head'
  }
</script>

<style lang="scss" scoped="" type="text/css"></style>

