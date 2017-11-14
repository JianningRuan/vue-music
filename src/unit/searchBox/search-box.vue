<template>
  <div class="search-box">
    <a class="return"></a>
    <div class="search">
      <input class="search-input" type="text" :placeholder="title" v-model="searchData" />
      <i class="clear-btn" v-show="searchData.length > 0" @click="clear"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import './search-box.scss'

  export default {
    props: {
      title: {
        type: String,
        default: '输入歌曲、歌手'
      }
    },
    data(){
      return {
        searchData: ''
      }
    },
    components: {},
    created(){
      this.$watch('searchData', (newVal)=>{
        this.$emit('search', newVal)
      })
    },
    mounted(){},
    activated(){},
    watch: {},
    computed:{},
    filters: {},
    methods: {
      //清除
      clear(){
        this.searchData = '';
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
