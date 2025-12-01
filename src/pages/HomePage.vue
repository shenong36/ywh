<template>
  <div class="home-page">
    <!-- 顶部Banner -->
    <div class="banner">
      <h1 class="banner-title">小车小区业委会创建</h1>
      <p class="banner-subtitle">流程可视化 · 参与便捷化 · 信息公开化</p>
    </div>

    <!-- 进度概览 -->
    <div class="progress-section card">
      <div class="progress-header">
        <h2 class="card-title">当前进度</h2>
        <span class="badge badge-warning">{{ homeData.phaseName }}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: homeData.progressPercent + '%' }"></div>
      </div>
      <div class="progress-text">{{ homeData.progressPercent }}% 已完成</div>
    </div>

    <!-- 紧急通知 -->
    <div class="notice-section card">
      <div class="notice-icon">📢</div>
      <div class="notice-content">
        <div class="notice-title">重要通知</div>
        <div class="notice-text">{{ homeData.notice }}</div>
      </div>
    </div>

    <!-- 功能入口 -->
    <div class="entrance-section">
      <div 
        v-for="item in homeData.entrances" 
        :key="item.url"
        class="entrance-card card"
        @click="goTo(item.url)"
      >
        <div class="entrance-icon">{{ item.icon }}</div>
        <div class="entrance-name">{{ item.name }}</div>
        <div class="entrance-arrow">›</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import homeData from '../mock/home.mock.json'

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter()
    const data = ref(homeData.homeData)

    const goTo = (url) => {
      router.push(url)
    }

    return {
      homeData: data,
      goTo
    }
  }
}
</script>

<style scoped>
.home-page {
  padding: 16px;
  padding-bottom: 80px;
}

.banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 24px;
  border-radius: 12px;
  margin-bottom: 16px;
  text-align: center;
}

.banner-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
}

.banner-subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.progress-section {
  margin-bottom: 16px;
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1989fa 0%, #64b5f6 100%);
  transition: width 0.3s;
}

.progress-text {
  text-align: right;
  font-size: 12px;
  color: #999;
}

.notice-section {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #fff7e6;
  border-left: 3px solid #fa8c16;
  margin-bottom: 16px;
}

.notice-icon {
  font-size: 24px;
}

.notice-content {
  flex: 1;
}

.notice-title {
  font-size: 14px;
  font-weight: 600;
  color: #fa8c16;
  margin-bottom: 4px;
}

.notice-text {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.entrance-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.entrance-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.entrance-card:active {
  transform: scale(0.98);
  background: #f8f8f8;
}

.entrance-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.entrance-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.entrance-arrow {
  position: absolute;
  right: 12px;
  top: 12px;
  font-size: 20px;
  color: #ccc;
}
</style>
