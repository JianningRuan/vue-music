/**
 * Created by Administrator on 2017/11/8.
 */
//mixin的作用是
import { mapGetters, mapMutations, mapActions } from 'vuex'


//判断是否在播放歌单的mixin
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted(){
    this.handlePlaylist(this.playList)
  },
  activated(){
    this.handlePlaylist(this.playList)
  },
  watch: {
    playList(newVal){
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist(){
      //如果有插入playListMixin这个mixin的插件，如果没有handlePlaylist方法，则以下报错
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

