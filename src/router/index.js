import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首頁',
        path: '/'
      },
    },
    {
      path: '/scenicSpot',
      name: 'ScenicSpot',
      component: () => import('../views/ScenicSpot.vue'),
      meta: {
        title: '探索景點',
        path: '/scenicSpot'
      }
    },
    {
      path: '/activity',
      name: 'Activity',
      component: () => import('../views/ActivityView.vue'),
      meta: {
        title: '節慶活動',
        path: '/activity'
      }
    },
    {
      path: '/restaurant',
      name: 'Restaurant',
      component: () => import('../views/RestaurantView.vue'),
      meta: {
        title: '品嘗美食',
        path: '/restaurant'
      }
    },
    {
      path: '/detailed',
      name: 'Detailed',
      component: () => import('../views/DetailedView.vue'),
      children: [
        {
          path: 'map/:id',
          component: () => import('../components/LeafletOSM.vue'),
        }
      ],
    }
  ],
  scrollBehavior () {
    return {
      top: 0,
    }
  }
})

export default router
