<template>
  <div class="song-list">
    <ul>
      <li v-for="song in songList">
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
