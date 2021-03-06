import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/music/music'
import Find from '@/components/find/find'
import FMusic from './../components/find/f-music/findMusic'
import FVideo from './../components/find/f-video/findVideo'
import FRadio from './../components/find/f-radio/findRadio'
import Trends from '@/components/trends/trends'

import Singer from '@/components/singer/singer'
import SingerDetail from './../components/singerDetail/singerDetail'
import Ranking from '@/components/ranking/ranking'
import RankingDetail from './../components/rankingDetail/ranking-detail'
import ClassifyDisc from '@/components/classifyDisc/classify-disc'
import DiscList from './../components/discList/disc-list'
import Search from './../components/search/search'

import RadioList from './../components/radioList/radio-list'

import Player from './../components/player/player'

import Disc from './../components/disc/disc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/find'
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/find',
      name: 'Find',
      component: Find,
      children: [
        {
          path: '/',
          redirect: 'fMusic'
        },
        {
          path: 'fMusic',
          component: FMusic
        },
        {
          path: 'fVideo',
          component: FVideo
        },
        {
          path: 'fRadio',
          component: FRadio
        }
      ]
    },
    {
      path: '/trends',
      name: 'Trends',
      component: Trends
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking,
      children: [
        {
          path: ':id',
          component: RankingDetail
        }
      ]
    },
    {
      path: '/classifyDisc',
      name: 'ClassifyDisc',
      component: ClassifyDisc,
      children: [
        {
          path: ':id',
          component: DiscList
        }
      ]
    },
    {
      path: '/player',
      name: 'Player',
      component: Player
    },
    {
      path: '/disc/:id',
      name: 'Disc',
      component: Disc
    },
    {
      path: '/radioList/:id',
      name: 'Radio',
      component: RadioList
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
