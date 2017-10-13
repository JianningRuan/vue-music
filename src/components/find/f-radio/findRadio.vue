<template>
  <div class="find-box">
    <scroll ref="scroll" :data="radioList">
      <div class="radio-wrapper">
        <div class="radio" v-for="radio in radioList">
          <div class="radio-images">
            <img @load="loadImage" v-lazy="radio.radioImg"/>
          </div>
          <h2>{{radio.radioName}}</h2>
          <p>播放量：{{radio.listenNum}}</p>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import './findRadio.scss'
  import { getRadioList } from './../../../api/recommend'
  import scroll from './../../../unit/scroll/scroll'
  export default {
    data(){
      return {
        radioList: []
      }
    },
    components: {
      scroll
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
              this.radioList = res.data.data.groupList[0].radioList;
            }
          })
        })
      },
      loadImage(){
        this.$refs.scroll.refresh();
      }
    }
  }
</script>
