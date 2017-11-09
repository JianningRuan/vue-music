<template>
  <div class="pos-wrapper flex-column">
    <c-header :title="title"></c-header>
    <scroll ref="scroll">
      <div class="disc-wrapper">
        <!--歌单-->
        <div class="disc" v-for="disc in discList" @click="selectItem(disc.dissid)">
          <div class="disc-img">
            <img v-lazy="disc.imgurl" @load="loadImage"/>
          </div>
          <div class="disc-name">{{disc.dissname}}</div>
        </div>
        <!--歌单-end-->
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import './disc-list.scss'
  import { getDiscList } from './../../api/recommend'
  import { mapMutations } from 'vuex'
  import CHeader from './../c-head/c-head'
  import scroll from './../../unit/scroll/scroll'

  export default {
    data(){
      return {
        title: '',
        discList: []
      }
    },
    components: {
      CHeader,
      scroll
    },
    created(){},
    mounted(){
      this.$nextTick(()=>{
        this.getDiscData();
      })
    },
    activated(){
      this.$nextTick(()=>{
        this.getDiscData();
      })
    },
    watch: {},
    computed:{},
    filters: {},
    methods: {
      getDiscData(){
        let discId = this.$route.params.id;
        getDiscList(discId).then((res)=>{
          console.log(res)
          if (res.code === 0){
            this.discList = res.data.list;
          }
        })
      },
      selectItem(discId){
        console.log(this)
        this.setDiscId(discId)
        this.$router.push({
          path: `/disc/${discId}`
        })
      },
      loadImage(){
        this.$refs.scroll.refresh();
      },
      ...mapMutations({
        setDiscId: 'SET_DISC_ID'
      })
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
