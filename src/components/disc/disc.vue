<template>
  <div class="pos-wrapper">歌单列表</div>
</template>
<script type="text/ecmascript-6">
  import './disc.scss'
  import { getDiscDetail } from './../../api/recommend'
  export default {
    data(){
      return {
        disstId: ''
      }
    },
    created(){},
    mounted(){
      this._getDiscDetail()
    },
    methods: {
      _getDiscDetail(){
        const disstId = this.$route.params.id;
        getDiscDetail(disstId).then((res)=>{
          console.log(res)
        })
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
    watch: {},
    filters: {},
    methods: {}
-->
