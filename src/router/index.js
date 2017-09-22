import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Story from '@/view/story'
import Share from '@/view/share'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:id',
      name: 'Home',
      component: Home
    },
    {
      path: '/story/:id',
      name: 'Story',
      component: Story
    },
    {
      path: '/share/:id',
      name: 'Share',
      component: Share
    }
  ]
})
