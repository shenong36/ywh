import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GuidePage from '../pages/GuidePage.vue'
import JoinPage from '../pages/JoinPage.vue'
import ProgressPage from '../pages/ProgressPage.vue'
import FeedbackPage from '../pages/FeedbackPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { showTabBar: true }
  },
  {
    path: '/guide',
    name: 'Guide',
    component: GuidePage,
    meta: { showTabBar: true }
  },
  {
    path: '/join',
    name: 'Join',
    component: JoinPage,
    meta: { showTabBar: true }
  },
  {
    path: '/progress',
    name: 'Progress',
    component: ProgressPage,
    meta: { showTabBar: true }
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: FeedbackPage,
    meta: { showTabBar: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { showTabBar: true }
  }
]

const router = createRouter({
  history: createWebHistory('/ywh/'),
  routes
})

export default router
