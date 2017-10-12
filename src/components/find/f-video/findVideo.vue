<template>
  <div class="find-box">
    <scroll ref="scroll" :data="mvList">
      <div class="mv-wrapper">
        <div class="mv" v-for="mv in mvList">
          <div class="mv-pic"><img @load="loginImage" v-lazy="mv.picurl"/></div>
          <div class="mv-data">
            {{mv.mvtitle}}
          </div>
        </div>
      </div>
    </scroll>
    <!--loading-->
    <div class="loading-wrapper" v-show="!mvList.length">
      <loading></loading>
    </div>
    <!--loading-end-->
  </div>
</template>
<script type="text/ecmascript-6">
  import './findVideo.scss'
  import { getMVList } from './../../../api/recommend'
  import scroll from './../../../unit/scroll/scroll'
  import loading from './../../../unit/loading/loading'
  export default {
    data(){
      return {
        mvList: []
      }
    },
    components: {
      scroll,
      loading
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
    methods: {
      loginImage() {
        this.$refs.scroll.refresh()
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
