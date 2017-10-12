<template>
  <div class="loading">
    <div class="loading-img"></div>
    <p></p>
  </div>
</template>
<script type="text/ecmascript-6">
  import './loading.scss'
  export default{
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
