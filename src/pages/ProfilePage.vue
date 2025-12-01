<template>
  <div class="profile-page">
    <div class="page-header">
      <h1 class="page-title">个人中心</h1>
    </div>

    <!-- 个人信息卡片 -->
    <div class="user-info-section card">
      <div class="user-avatar">👤</div>
      <h2 class="user-name">{{ profileData.userInfo.name }}</h2>
      <div class="user-meta">
        <div class="meta-item">
          <span class="meta-label">房号：</span>
          <span class="meta-value">{{ profileData.userInfo.houseNo }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">联系方式：</span>
          <span class="meta-value">{{ profileData.userInfo.phone }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">房屋面积：</span>
          <span class="meta-value">{{ profileData.userInfo.area }}㎡</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">认证状态：</span>
          <span class="badge" :class="{
            'badge-success': profileData.userInfo.verifyStatus === 'verified'
          }">
            {{ profileData.userInfo.verifyStatus === 'verified' ? '已认证' : '未认证' }}
          </span>
        </div>
        <div class="meta-item">
          <span class="meta-label">投票权数：</span>
          <span class="meta-value highlight">{{ profileData.userInfo.voteWeight }} 票</span>
        </div>
      </div>
    </div>

    <!-- 参与记录 -->
    <div class="records-section card">
      <h2 class="card-title">📋 我的参与记录</h2>
      <div v-if="profileData.joinRecords.length > 0" class="record-list">
        <div 
          v-for="record in profileData.joinRecords" 
          :key="record.time"
          class="record-item"
        >
          <div class="record-header">
            <span class="record-type">{{ record.type }}</span>
            <span class="badge" :class="{
              'badge-success': record.status === '已通过'
            }">
              {{ record.status }}
            </span>
          </div>
          <div class="record-time">{{ record.time }}</div>
          <div v-if="record.desc" class="record-desc">{{ record.desc }}</div>
        </div>
      </div>
      <div v-else class="empty-state">
        暂无参与记录
      </div>
    </div>

    <!-- 投票记录 -->
    <div class="vote-records-section card">
      <h2 class="card-title">🗳️ 我的投票记录</h2>
      <div v-if="profileData.voteRecords.length > 0" class="vote-list">
        <div 
          v-for="vote in profileData.voteRecords" 
          :key="vote.time"
          class="vote-item"
        >
          <div class="vote-event">{{ vote.event }}</div>
          <div class="vote-detail">
            <span class="vote-label">投票对象：</span>
            <span class="vote-target">{{ vote.voteFor }}</span>
          </div>
          <div class="vote-time">{{ vote.time }}</div>
        </div>
      </div>
      <div v-else class="empty-state">
        暂无投票记录
      </div>
    </div>

    <!-- 反馈记录 -->
    <div class="feedback-records-section card">
      <h2 class="card-title">💬 我的反馈记录</h2>
      <div v-if="profileData.feedbackRecords.length > 0" class="feedback-list">
        <div 
          v-for="feedback in profileData.feedbackRecords" 
          :key="feedback.id"
          class="feedback-item"
        >
          <div class="feedback-content">{{ feedback.content }}</div>
          <div class="feedback-meta">
            <span class="feedback-time">{{ feedback.time }}</span>
            <span class="badge" :class="{
              'badge-success': feedback.status === '已回复'
            }">
              {{ feedback.status }}
            </span>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        暂无反馈记录
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-section">
      <div class="menu-item card" @click="goToFeedback">
        <span class="menu-icon">💬</span>
        <span class="menu-text">意见反馈</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item card" @click="clearCache">
        <span class="menu-icon">🗑️</span>
        <span class="menu-text">清除缓存</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import profileData from '../mock/profile.mock.json'

export default {
  name: 'ProfilePage',
  setup() {
    const router = useRouter()
    const data = ref(profileData.profileData)

    const goToFeedback = () => {
      router.push('/feedback')
    }

    const clearCache = () => {
      if (confirm('确定要清除所有本地缓存数据吗？')) {
        localStorage.clear()
        alert('缓存已清除')
      }
    }

    return {
      profileData: data,
      goToFeedback,
      clearCache
    }
  }
}
</script>

<style scoped>
.profile-page {
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
  color: #333;
}

.user-info-section {
  text-align: center;
  margin-bottom: 16px;
  padding: 24px 16px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.user-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.user-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.meta-item:last-child {
  border-bottom: none;
}

.meta-label {
  font-size: 14px;
  color: #666;
}

.meta-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.meta-value.highlight {
  color: #1989fa;
  font-weight: 600;
  font-size: 16px;
}

.records-section,
.vote-records-section,
.feedback-records-section {
  margin-bottom: 16px;
}

.record-list,
.vote-list,
.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-item,
.vote-item,
.feedback-item {
  padding: 12px;
  background: #f8f8f8;
  border-radius: 6px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.record-type {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.record-time,
.vote-time,
.feedback-time {
  font-size: 12px;
  color: #999;
}

.record-desc {
  font-size: 13px;
  color: #666;
  margin-top: 6px;
}

.vote-event {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.vote-detail {
  margin-bottom: 8px;
}

.vote-label {
  font-size: 13px;
  color: #666;
}

.vote-target {
  font-size: 14px;
  color: #1989fa;
  font-weight: 600;
}

.feedback-content {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.6;
}

.feedback-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.menu-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:active {
  transform: scale(0.98);
  background: #f8f8f8;
}

.menu-icon {
  font-size: 24px;
}

.menu-text {
  flex: 1;
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.menu-arrow {
  font-size: 20px;
  color: #ccc;
}
</style>
