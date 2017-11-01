<template>
  <div class="progress-circle">
    <svg width="32" height="32" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import './progress-circle.scss'
  export default {

  }
</script>
<!--
    data(){
      return {}
    },
    components: {},
    created(){},
    mounted(){},
    activated(){},
    watch: {},
    computed:{},
    filters: {},
    methods: {}
-->
