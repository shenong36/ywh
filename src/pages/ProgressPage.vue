<template>
  <div class="progress-page">
    <div class="page-header">
      <h1 class="page-title">最新进展</h1>
      <p class="page-subtitle">实时跟踪创建进度</p>
    </div>

    <!-- 倒计时提醒 -->
    <div v-if="progressData.countdown" class="countdown-section card">
      <div class="countdown-icon">⏰</div>
      <div class="countdown-content">
        <h3 class="countdown-title">{{ progressData.countdown.title }}</h3>
        <div class="countdown-time">
          <span class="time-block">{{ progressData.countdown.remainingDays }}天</span>
          <span class="time-block">{{ progressData.countdown.remainingHours }}时</span>
          <span class="time-block">{{ progressData.countdown.remainingMinutes }}分</span>
        </div>
        <p class="countdown-end">截止时间：{{ progressData.countdown.endTime }}</p>
      </div>
    </div>

    <!-- 进度时间轴 -->
    <div class="timeline-section card">
      <h2 class="card-title">创建时间轴</h2>
      <div class="timeline">
        <div 
          v-for="(item, index) in progressData.timeline" 
          :key="index"
          class="timeline-item"
          :class="item.status"
        >
          <div class="timeline-dot">
            <span v-if="item.status === 'completed'">✓</span>
            <span v-else-if="item.status === 'ongoing'">●</span>
            <span v-else>○</span>
          </div>
          <div class="timeline-content">
            <div class="timeline-date">{{ item.time }}</div>
            <h3 class="timeline-event">{{ item.event }}</h3>
            <p class="timeline-desc">{{ item.desc }}</p>
            <a v-if="item.attachment" :href="item.attachment" class="timeline-attachment" download>
              📎 查看附件
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 公示信息 -->
    <div class="publicity-section card">
      <h2 class="card-title">公示信息</h2>
      <div 
        v-for="publicity in progressData.publicityList" 
        :key="publicity.type"
        class="publicity-item"
      >
        <div class="publicity-header">
          <h3 class="publicity-title">{{ publicity.title }}</h3>
          <span class="badge" :class="{
            'badge-warning': publicity.status === '进行中',
            'badge-success': publicity.status === '已结束'
          }">
            {{ publicity.status }}
          </span>
        </div>
        <div class="publicity-meta">
          公示期：{{ publicity.startTime }} 至 {{ publicity.endTime }}
          （{{ publicity.publicityDays }}天）
        </div>
        <div v-if="publicity.list.length > 0" class="publicity-list">
          <div v-for="(person, idx) in publicity.list" :key="idx" class="publicity-person">
            {{ person }}
          </div>
        </div>
        <div v-else class="publicity-empty">
          暂无名单
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import progressData from '../mock/progress.mock.json'

export default {
  name: 'ProgressPage',
  setup() {
    const data = ref(progressData.progressData)

    return {
      progressData: data
    }
  }
}
</script>

<style scoped>
.progress-page {
  padding: 16px;
  padding-bottom: 80px;
}

.page-header {
  text-align: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.page-subtitle {
  font-size: 14px;
  color: #999;
}

.countdown-section {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, #fa8c16 0%, #faad14 100%);
  color: white;
  margin-bottom: 16px;
}

.countdown-icon {
  font-size: 40px;
}

.countdown-content {
  flex: 1;
}

.countdown-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.countdown-time {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.time-block {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
}

.countdown-end {
  font-size: 12px;
  opacity: 0.9;
}

.timeline-section {
  margin-bottom: 16px;
}

.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item {
  position: relative;
  padding-bottom: 24px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -32px;
  top: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
}

.timeline-item.completed .timeline-dot {
  border-color: #52c41a;
  background: #52c41a;
  color: white;
}

.timeline-item.ongoing .timeline-dot {
  border-color: #1989fa;
  background: #1989fa;
  color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(25, 137, 250, 0.4);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(25, 137, 250, 0);
  }
}

.timeline-content {
  background: #f8f8f8;
  padding: 12px;
  border-radius: 6px;
}

.timeline-date {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.timeline-event {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

.timeline-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}

.timeline-attachment {
  display: inline-block;
  font-size: 12px;
  color: #1989fa;
  text-decoration: none;
}

.publicity-section {
  margin-bottom: 16px;
}

.publicity-item {
  padding: 16px;
  background: #f8f8f8;
  border-radius: 6px;
  margin-bottom: 12px;
}

.publicity-item:last-child {
  margin-bottom: 0;
}

.publicity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.publicity-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.publicity-meta {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
}

.publicity-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.publicity-person {
  padding: 8px;
  background: white;
  border-radius: 4px;
  font-size: 13px;
  color: #666;
}

.publicity-empty {
  padding: 12px;
  text-align: center;
  font-size: 13px;
  color: #999;
  background: white;
  border-radius: 4px;
}
</style>
