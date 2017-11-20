<template>
  <scroll :data="resultList" :pullUp="pullUp" @scrollToEnd="scrollToEnd">
    <ul>
      <li @click="selectItem(result)" v-for="result in resultList">
        <i class="iconfont" :class="selectIcon(result)"></i>
        <span v-html="selectTitle(result)"></span>
      </li>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import './suggest.scss'
  import scroll from './../../unit/scroll/scroll'
  import { getSearch } from './../../api/recommend'
  import { createDiscSongList } from './../../assets/js/common'

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
        resultList: [],
        pullUp: true
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
            this.resultList = this._crateSearchResult(res.data);
          }
        })
      }
    },
    computed:{},
    filters: {},
    methods: {
        _crateSearchResult(searchData){
        let result = [];
        if (searchData.zhida && searchData.zhida.singerid){
          result.push({...searchData.zhida, ...{type: SINGER}})
        }
        if (searchData.song){
          result = result.concat(createDiscSongList(searchData.song.list));
        }
        console.log(result);
        return result
      },
      //icon的选择
      selectIcon(data){
        if (data.type == SINGER){
          return 'icon-user'; //返回歌手的icon
        }else {
          return 'icon-music'; //返回音乐的icon
        }
      },
      //文字的选择
      selectTitle(data){
        if (data.type == SINGER){
          return data.singername;
        }else {
          return `${data.songName} - ${data.singer}`
        }
      },
      //点击执行
      selectItem(data){

      },
      //监听滚动完毕
      scrollToEnd(){
        console.log('滚动到底了')
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
