<template>
  <div class="pos-wrapper flex-column">111</div>
</template>
<script type="text/ecmascript-6">
  import './ranking-detail.scss'
  import { getRankingDetail } from './../../api/recommend'

  export default {
    data(){
      return {}
    },
    components: {},
    created(){},
    mounted(){
      var aa = this.$route.params.id;
      getRankingDetail(aa).then((res)=>{
        console.log(res)
      })
    },
    activated(){},
    watch: {},
    filters: {},
    methods: {}
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
    filters: {},
    methods: {}
-->
