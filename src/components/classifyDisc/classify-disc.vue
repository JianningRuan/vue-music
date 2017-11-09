<template>
  <transition name="slide">
    <div class="pos-wrapper flex-column">
      <c-header></c-header>
      <div class="main relative">
        <div class="disc-muse-box">
          <div class="disc-muse-tit">1111</div>
          <div class="disc-muse-list">
            <ul>
              <li>22</li>
              <li>313</li>
              <li>12</li>
              <li>33</li>
              <li>112</li>
              <li>321</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import './classify-disc.scss'
  import CHeader from './../c-head/c-head'
  import { getDiscMuse } from './../../api/recommend'

  export default {
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
