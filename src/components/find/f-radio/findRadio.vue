<template>
  <div class="find-box">
    <radio-list-view :data="radioList"></radio-list-view>
    <!--<scroll ref="scroll" :data="radioList">
      <div class="radio-wrapper">
        <div class="radio" v-for="radio in radioList" @click="selectItem(radio)">
          <div class="radio-images">
            <img @load="loadImage" v-lazy="radio.radioImg"/>
          </div>
          <h2>{{radio.radioName}}</h2>
          <p>播放量：{{radio.listenNum}}</p>
        </div>
      </div>
    </scroll>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import './findRadio.scss'
  import { getRadioList } from './../../../api/recommend'
  import { crateRadioList } from './../../../assets/js/common'
  import scroll from './../../../unit/scroll/scroll'
  import radioListView from './../../../unit/rListView/radio-list-view'
  export default {
    data(){
      return {
        radioList: []
      }
    },
    components: {
      scroll,
      radioListView
    },
    created(){},
    mounted(){
      this.getRadio();
    },
    watch: {},
    filters: {},
    methods: {
      getRadio(){
        this.$nextTick(()=>{
          getRadioList().then((res)=>{
            console.log(res);
            if (res.code === 0){
              this.radioList = crateRadioList(res.data.data.groupList);
              console.log(this.radioList)
            }
          })
        })
      },
      loadImage(){
        this.$refs.scroll.refresh();
      },
      selectItem(radio){
        console.log(radio);

      }
    }
  }
</script>
