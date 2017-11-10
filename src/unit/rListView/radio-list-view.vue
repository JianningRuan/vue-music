<template>
  <div class="radio-wrapper">
    <scroll class="radio-scroll" ref="radioScroll" :data="data">
      <div>
        <div class="radio-box" v-for="radioGroup in data">
          <div class="radio" v-for="radio in radioGroup.list" @click="selectItem(radio.id)">
            <div class="radio-pic">
              <img v-lazy="radio.pic"/>
            </div>
            <div class="radio-name">{{radio.name}}</div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="radio-menu">
      <ul>
        <li v-for="shortCut in shortCutList">{{shortCut.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import './radio-list-view.scss'
  import scroll from './../../unit/scroll/scroll'

  export default {
    props: {
      data: Array,
      default: []
      /*
       [ {name: '', type: 1, list: [ {name: '', id: 1, num: 1, pic: ''}, {name: '', id: 2, num: 1, pic: ''} ] } ]
       */
    },
    data(){
      return {}
    },
    components: {
      scroll
    },
    created(){},
    mounted(){},
    activated(){},
    watch: {},
    computed:{
      shortCutList(){
        return this.data.map((item)=>{
          return this.crateShortCutList(item)
        })
      }
    },
    filters: {},
    methods: {
      //构建返回快速导航
      crateShortCutList(val){
        let item = {
          name: val.name,
          type: val.type
        };
        return item;
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
