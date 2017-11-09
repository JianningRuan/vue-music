<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <c-header :title="title"></c-header>
      <div class="main relative">
        <div class="disc-muse-box" v-for="tag in discTag">
          <div class="disc-muse-tit">{{tag.categoryGroupName}}</div>
          <div class="disc-muse-list">
            <ul>
              <li v-for="tagChild in tag.items" v-html="tagChild.categoryName" @click="selectItem(tagChild.categoryId)"></li>
            </ul>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './classify-disc.scss'
  import CHeader from './../c-head/c-head'
  import { getDiscMuse } from './../../api/recommend'

  export default {
    data(){
      return {
        title: '分类歌单',
        discTag: []
      }
    },
    components: {
      CHeader
    },
    created(){
      this.$nextTick(()=>{
        getDiscMuse().then((res)=>{
          console.log(res);
          if (res.code === 0){
            this.discTag = res.data.categories;
          }
        })
      })
    },
    mounted(){},
    activated(){},
    watch: {},
    computed:{},
    filters: {},
    methods: {
      selectItem(id){
        this.$router.push({
          path: `/classifyDisc/${id}`
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
    activated(){},
    watch: {},
    computed:{},
    filters: {},
    methods: {}
-->
