<template>
  <div class="guide-page">
    <div class="page-header">
      <h1 class="page-title">业委会创建流程指南</h1>
      <p class="page-subtitle">6个阶段，逐步推进，规范透明</p>
    </div>

    <!-- 流程阶段列表 -->
    <div class="phase-list">
      <div 
        v-for="(phase, index) in guideData" 
        :key="phase.phaseId"
        class="phase-card card"
      >
        <div class="phase-header" @click="togglePhase(index)">
          <div class="phase-number">{{ index + 1 }}</div>
          <div class="phase-info">
            <h3 class="phase-name">{{ phase.phaseName }}</h3>
            <p class="phase-desc">{{ phase.desc }}</p>
          </div>
          <div class="phase-arrow" :class="{ expanded: expandedIndex === index }">
            ▼
          </div>
        </div>

        <!-- 展开详情 -->
        <div v-show="expandedIndex === index" class="phase-detail">
          <div class="divider"></div>

          <!-- 操作步骤 -->
          <div class="detail-section">
            <h4 class="section-title">📝 操作步骤</h4>
            <div v-for="step in phase.steps" :key="step.step" class="step-item">
              <div class="step-number">{{ step.step }}</div>
              <div class="step-content">{{ step.content }}</div>
            </div>
          </div>

          <!-- 所需材料 -->
          <div class="detail-section">
            <h4 class="section-title">📎 所需材料</h4>
            <div v-for="material in phase.materials" :key="material.name" class="material-item">
              <span class="material-name">{{ material.name }}</span>
              <a :href="material.url" class="material-link" download>下载</a>
            </div>
          </div>

          <!-- 常见问题 -->
          <div class="detail-section">
            <h4 class="section-title">❓ 常见问题</h4>
            <div v-for="faq in phase.faq" :key="faq.question" class="faq-item">
              <div class="faq-question">Q: {{ faq.question }}</div>
              <div class="faq-answer">A: {{ faq.answer }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 政策链接 -->
    <div class="policy-section card">
      <h3 class="card-title">📚 相关政策法规</h3>
      <div class="policy-link">《物业管理条例》</div>
      <div class="policy-link">《业主大会和业主委员会指导规则》</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import guideData from '../mock/guide.mock.json'

export default {
  name: 'GuidePage',
  setup() {
    const data = ref(guideData.guideData)
    const expandedIndex = ref(0)

    const togglePhase = (index) => {
      expandedIndex.value = expandedIndex.value === index ? -1 : index
    }

    return {
      guideData: data,
      expandedIndex,
      togglePhase
    }
  }
}
</script>

<style scoped>
.guide-page {
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

.phase-list {
  margin-bottom: 16px;
}

.phase-card {
  margin-bottom: 12px;
  overflow: hidden;
}

.phase-header {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.phase-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.phase-info {
  flex: 1;
}

.phase-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

.phase-desc {
  font-size: 13px;
  color: #999;
  line-height: 1.5;
}

.phase-arrow {
  font-size: 12px;
  color: #999;
  transition: transform 0.3s;
}

.phase-arrow.expanded {
  transform: rotate(180deg);
}

.phase-detail {
  padding-top: 16px;
}

.detail-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.step-item {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: flex-start;
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e6f7ff;
  color: #1989fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.material-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.material-item:last-child {
  border-bottom: none;
}

.material-name {
  font-size: 14px;
  color: #666;
}

.material-link {
  color: #1989fa;
  font-size: 13px;
  text-decoration: none;
}

.faq-item {
  margin-bottom: 16px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 6px;
}

.faq-question {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.faq-answer {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.policy-section {
  margin-bottom: 16px;
}

.policy-link {
  padding: 12px;
  background: #f8f8f8;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #1989fa;
  cursor: pointer;
}

.policy-link:last-child {
  margin-bottom: 0;
}
</style>
