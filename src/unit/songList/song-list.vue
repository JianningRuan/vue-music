<template>
  <div class="song-list">
    <ul class="song-list-box">
      <li v-for="(song, index) in songList" @click="selectItem(song, index)">
        <h2>{{song.songName}}</h2>
        <p>{{song.singer}}</p>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import './song-list.scss'
  export default {
    props: {
      songList: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(song, index){
        this.$emit('select', song, index)
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
    watch: {},
    filters: {},
    methods: {}
-->
