<template>
  <div class="progress-bar" ref="progressBar" @click="touchToHere">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-point" ref="progressPoint" @touchstart.prevent="ProgressTouchStart" @touchmove.prevent="ProgressTouchMove" @touchend="ProgressTouchEnd"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import './progress-bar.scss'
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {}
    },
    components: {},
    created(){
      this.touch = {};
    },
    mounted(){},
    activated(){},
    watch: {
      percent(newPercent){
        if (newPercent >= 0 && !this.touch.initiated){
          let progressBarWidth = this.$refs.progressBar.clientWidth;
          let progressWidth = newPercent * progressBarWidth;
          this._offset(progressWidth);
        }
      }
    },
    computed:{},
    filters: {},
    methods: {
      //
      ProgressTouchStart(e){
        this.touch.initiated = true;
        this.touch.startX = e.touches[0].pageX;
        this.touch.left = this.$refs.progress.clientWidth;
      },
      ProgressTouchMove(e){
        if (!this.touch.initiated){
          return
        }
        let deltaX = e.touches[0].pageX - this.touch.startX;
        let offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(this.touch.left + deltaX, 0));
        this._offset(offsetWidth)
      },
      ProgressTouchEnd(e){
        this.touch.initiated = false;
        this.sendPercent();
      },
      sendPercent(){
        const  progressBarWidth = this.$refs.progressBar.clientWidth;
        const percent = this.$refs.progress.clientWidth / progressBarWidth;
        this.$emit('percentChange', percent)
      },
      //输出进度条位置
      _offset(pWidth){
        this.$refs.progress.style.width = `${pWidth}px`;
        this.$refs.progressPoint.style.left = `${pWidth}px`
      },
      touchToHere(e){
        console.log(e);
        const rect = this.$refs.progressBar.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left;
        this._offset(offsetWidth);
        this.sendPercent();
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
