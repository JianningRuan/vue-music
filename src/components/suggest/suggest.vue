<template>
  <scroll ref="suggest" class="suggest" :data="resultList" :pullUp="pullUp" @scrollToEnd="scrollToEnd">
    <ul>
      <li class="search-list" @click="selectItem(result)" v-for="result in resultList">
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
  import { createDiscSongList, singer } from './../../assets/js/common'
  import { mapMutations, mapActions } from 'vuex'

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
        this.search(newVal)
      }
    },
    computed:{},
    filters: {},
    methods: {
        search(newVal){
          //搜索的内容改变的时候，页面重置。内容重置
          this.page = 1;
          this.resultList = [];
          this.$refs.suggest.scroll(0, 0);//回滚到最顶部
          getSearch(newVal, this.page).then((res)=>{
            console.log(res);
            if (res.code === 0){
              this.resultList = this._crateSearchResult(res.data);
            }
          })
        },
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
        if (data.type == SINGER){
          this.setSinger(new singer({
            id:data.singerid,
            mid: data.singermid,
            name: data.singername
          }));
          this.$router.push({
            path: `/singer/${data.singermid}`
          })
        }else {

        }
      },
      //监听滚动完毕
      scrollToEnd(){
        this.page++;
        getSearch(this.query, this.page).then((res)=>{
          console.log(res);
          if (res.code === 0){
            this.resultList = this.resultList.concat(createDiscSongList(res.data.song.list));
          }
        });
        console.log('滚动到底了')
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
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
