/**
 * Created by Administrator on 2017/11/8.
 */
//mixin的作用是
import { mapGetters } from 'vuex'


//判断是否在播放歌单的mixin
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted(){
    this.handlePlaylist(this.playlist)
  },
  activated(){
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal){
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

