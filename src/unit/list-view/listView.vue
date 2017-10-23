<template>
  <div class="main">
    <scroll ref="scroll">
      <div>
        <div class="singer-box" v-for="singer in singerList">
          <div class="singer-tit" ref="singerTit">{{singer.title}}</div>
          <div class="singer-list">
            <div class="singer-item" v-for="singerItem in singer.item" @click="selectSinger(singerItem)">
              <div class="singer-pic">
                <img @load="loadImage" v-lazy="singerItem.headPic"/>
              </div>
              <div class="singer-cont">{{singerItem.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="short-cut-list" v-on:touchstart="touchStartShortCut">
      <ul>
        <li v-for="(letter, index) in shortCutList" :data-index="index">{{letter}}</li>
      </ul>
    </div>
  </div>
</template>
<!--
    data(){
      return {}
    },
    components: {},
    created(){},
    mounted(){},
    activated(){},
    watch: {},
    filters: {},
    methods: {}
-->
