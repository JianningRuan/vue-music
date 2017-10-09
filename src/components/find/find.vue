<template>
  <div class="main">
    <div class="find-nav">
      <router-link to="/find/fMusic">音乐</router-link>
      <router-link to="/find/fVideo">视频</router-link>
      <router-link to="/find/fRadio">电台</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import './find.scss';
</script>
