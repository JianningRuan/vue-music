import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/components/music/music'
import Find from '@/components/find/find'
import FMusic from './../components/find/f-music/findMusic'
import FVideo from './../components/find/f-video/findVideo'
import FRadio from './../components/find/f-radio/findRadio'
import Trends from '@/components/trends/trends'

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
    }
  ]
})
