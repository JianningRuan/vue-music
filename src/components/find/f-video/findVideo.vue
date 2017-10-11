<template>
  <div class="find-box">
    <scroll :data="mvList">
      <div class="mv-wrapper">
        <div class="mv" v-for="mv in mvList">
          <div class="mv-pic"><img :src="mv.picurl"/></div>
          <div class="mv-data">
            {{mv.mvtitle}}
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import './findVideo.scss'
  import { getMVList } from './../../../api/recommend'
  import scroll from './../../../unit/scroll/scroll'
  export default {
    data(){
      return {
        mvList: []
      }
    },
    components: {
      scroll
    },
    created(){},
    mounted(){
      this.$nextTick(()=>{
        //接口获取mv
        getMVList().then((res)=>{
          console.log(res);
          if (res.code === 0){
            this.mvList = res.data.mvlist;
          }
        })
      })
    },
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
    watch: {},
    filters: {},
    methods: {}
-->
