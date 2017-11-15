<template>
  <scroll :data="result">
    <ul>
      <li></li>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import './suggest.scss'
  import scroll from './../../unit/scroll/scroll'
  import { getSearch } from './../../api/recommend'
  //import { crateSearchReult } from './../../assets/js/common'

  const SINGER = 'singer';

  export default {
    props: {
      //需要搜索的关键字
      query: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        result: []
      }
    },
    components: {
      scroll
    },
    created(){},
    mounted(){},
    activated(){},
    watch: {
      query(newVal){
        getSearch(newVal).then((res)=>{
          console.log(res)
          if (res.code === 0){
            this.result = this._crateSearchReult(res.data);
          }
        })
      }
    },
    computed:{},
    filters: {},
    methods: {
      _crateSearchReult(searchData){
        let result = [];
        if (searchData.zhida && searchData.zhida.singerid){
          result.push({...searchData.zhida, ...{type: SINGER}})
        }
        console.log(result)
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
