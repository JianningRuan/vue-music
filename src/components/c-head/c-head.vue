<template>
  <div class="c-header">
    <slot></slot>
    <h1 v-if="isShowTit">{{title}}</h1>
    <a class="return" @click="back">
      <i class="iconfont icon-left"></i>
    </a>
  </div>
</template>
<script type="text/ecmascript-6">
  import './c-head.scss'
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      isShowTit: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {}
    },
    components: {},
    created(){},
    mounted(){},
    watch: {},
    filters: {},
    methods: {
      back(){
        this.$router.back()
      }
    }
  }
</script>
