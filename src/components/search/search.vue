<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <search-box @search="watchSearch"></search-box>
      <div class="main">
        <div class="hot-key-wrapper">
          <div class="hot-key-title">热门搜索</div>
          <div class="hot-key">
            <a v-for="key in hotKey" @click="selectKey(key)">{{key.k}}</a>
          </div>
        </div>
        <div class="search-result">
          <suggest :query="searchData"></suggest>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './search.scss'
  import searchBox from './../../unit/searchBox/search-box'
  import suggest from './../suggest/suggest'
  import { gethotkey } from './../../api/recommend'

  export default {
    data(){
      return {
        hotKey: [],
        searchData: ''
      }
    },
    components: {
      searchBox,
      suggest
    },
    created(){
      this._getHotKey();
    },
    mounted(){},
    activated(){},
    watch: {},
    computed:{},
    filters: {},
    methods: {
      //监听搜索框的值变化
      watchSearch(searchData){
        console.log(searchData)
        this.searchData = searchData
      },
      //请求热门搜索
      _getHotKey(){
        gethotkey().then((res)=>{
          console.log(res)
          if (res.code === 0){
            this.hotKey = res.data.hotkey.slice(0, 10);
          }
        })
      },
      selectKey(key){

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
