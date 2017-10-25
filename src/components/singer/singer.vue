<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <c-header :title="title"></c-header>
      <list-view :data="singerList" @selectItem="selectSinger"></list-view>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './singer.scss'
  import CHeader from './../c-head/c-head'
  import { getSinger } from './../../api/recommend'
  import { singer, getData } from  './../../assets/js/common'
  import { mapMutations } from 'vuex'
  import listView from './../../unit/list-view/listView'

  export default {
    data(){
      return {
        title: '歌手',
        singerList: []
      }
    },
    computed: {},
    components: {
      CHeader,
      listView
    },
    created(){},
    mounted(){
      this.$nextTick( ()=>{
        getSinger().then((res)=>{
          this.singerList = this.crateSingerList(res.data.list);
        })
      })
    },
    watch: {},
    filters: {},
    methods: {
      //创建歌手列表格式
      crateSingerList(list){
        let map = {
          hot: {
            title: '热门',
            item: []
          }
        };
        list.forEach((item, index)=>{
          if (index < 10){
            map.hot.item.push( new singer({
              id: item.Fsinger_id,
              mid: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          let key = item.Findex;
          if (!map[key]){
            map[key] = {
              title: key,
              item: []
            }
          }
          map[key].item.push( new singer({
            id: item.Fsinger_id,
            mid: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        });
        //排序
        let hot = [];
        let ret = [];
        for (let key in map){
          let val = map[key];
          if (val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if (val.title == '热门'){
            hot.push(val)
          }
        }
        ret.sort((a, b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        });
        return hot.concat(ret)
      },
      //选择歌手
      selectSinger(singer){
        this.$router.push({
          path: `/singer/${singer.mid}`
        });
        this.setSinger(singer)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>
