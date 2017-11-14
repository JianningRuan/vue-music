<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <search-box @search="watchSearch"></search-box>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './search.scss'
  import searchBox from './../../unit/searchBox/search-box'

  export default {
    data(){
      return {}
    },
    components: {
      searchBox
    },
    created(){},
    mounted(){},
    activated(){},
    watch: {},
    computed:{},
    filters: {},
    methods: {
      //监听搜索框的值变化
      watchSearch(searchData){
        console.log(searchData)
      }
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
    activated(){},
    watch: {},
    computed:{},
    filters: {},
    methods: {}
-->
