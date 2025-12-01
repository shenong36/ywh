<template>
  <div class="tab-bar">
    <div 
      v-for="item in tabs" 
      :key="item.path"
      class="tab-item"
      :class="{ active: isActive(item.path) }"
      @click="goTo(item.path)"
    >
      <div class="tab-icon">{{ item.icon }}</div>
      <div class="tab-label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'TabBar',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const tabs = [
      { path: '/', label: '首页', icon: '🏠' },
      { path: '/guide', label: '流程指南', icon: '📋' },
      { path: '/join', label: '我要参与', icon: '✋' },
      { path: '/progress', label: '最新进展', icon: '📊' },
      { path: '/profile', label: '个人中心', icon: '👤' }
    ]

    const isActive = (path) => {
      return route.path === path
    }

    const goTo = (path) => {
      router.push(path)
    }

    return {
      tabs,
      isActive,
      goTo
    }
  }
}
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  z-index: 999;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.tab-label {
  font-size: 12px;
  color: #666;
}

.tab-item.active .tab-label {
  color: #1989fa;
}
</style>
