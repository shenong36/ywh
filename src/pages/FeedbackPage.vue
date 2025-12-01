<template>
  <div class="feedback-page">
    <div class="page-header">
      <h1 class="page-title">意见反馈</h1>
      <p class="page-subtitle">您的意见，我们的改进动力</p>
    </div>

    <!-- 反馈表单 -->
    <div class="feedback-form-section card">
      <h2 class="card-title">提交反馈</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label class="form-label">反馈类型 <span class="required">*</span></label>
          <select v-model="formData.type" class="form-select" required>
            <option value="">请选择</option>
            <option 
              v-for="type in feedbackData.feedbackTypes" 
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>

        <div class="form-item">
          <label class="form-label">反馈内容 <span class="required">*</span></label>
          <textarea
            v-model="formData.content"
            class="form-textarea"
            placeholder="请详细描述您的问题或建议..."
            rows="6"
            required
          ></textarea>
        </div>

        <div class="form-item">
          <label class="form-label">联系方式（选填）</label>
          <input
            v-model="formData.contact"
            type="text"
            class="form-input"
            placeholder="方便我们回复时联系您"
          />
        </div>

        <button type="submit" class="btn btn-primary submit-btn">
          提交反馈
        </button>
      </form>
    </div>

    <!-- 我的反馈记录 -->
    <div class="my-feedback-section card">
      <h2 class="card-title">我的反馈记录</h2>
      <div v-if="myFeedbacks.length > 0" class="feedback-list">
        <div 
          v-for="feedback in myFeedbacks" 
          :key="feedback.id"
          class="feedback-item"
        >
          <div class="feedback-header">
            <span class="badge badge-success">{{ feedback.type }}</span>
            <span class="feedback-time">{{ feedback.time }}</span>
          </div>
          <p class="feedback-content">{{ feedback.content }}</p>
          <div class="feedback-status">
            状态：
            <span class="status-text" :class="{
              'text-primary': feedback.status === '已回复'
            }">
              {{ feedback.status }}
            </span>
          </div>
          <div v-if="feedback.reply" class="feedback-reply">
            <div class="reply-label">回复：</div>
            <div class="reply-content">{{ feedback.reply }}</div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        暂无反馈记录
      </div>
    </div>

    <!-- 历史反馈（Mock数据） -->
    <div class="history-feedback-section card">
      <h2 class="card-title">其他业主反馈</h2>
      <div class="feedback-list">
        <div 
          v-for="feedback in feedbackData.mockFeedbacks" 
          :key="feedback.id"
          class="feedback-item"
        >
          <div class="feedback-header">
            <span class="badge" :class="{
              'badge-success': feedback.type === '咨询',
              'badge-warning': feedback.type === '建议'
            }">
              {{ feedback.type }}
            </span>
            <span class="feedback-time">{{ feedback.time }}</span>
          </div>
          <p class="feedback-content">{{ feedback.content }}</p>
          <div class="feedback-status">
            状态：
            <span class="status-text" :class="{
              'text-primary': feedback.status === '已回复'
            }">
              {{ feedback.status }}
            </span>
          </div>
          <div v-if="feedback.reply" class="feedback-reply">
            <div class="reply-label">回复：</div>
            <div class="reply-content">{{ feedback.reply }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 常见问题 -->
    <div class="faq-section card">
      <h2 class="card-title">💡 常见问题</h2>
      <div class="faq-list">
        <div v-for="faq in feedbackData.faq" :key="faq.question" class="faq-item">
          <div class="faq-question">Q: {{ faq.question }}</div>
          <div class="faq-answer">A: {{ faq.answer }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import feedbackData from '../mock/feedback.mock.json'

export default {
  name: 'FeedbackPage',
  setup() {
    const data = ref(feedbackData.feedbackData)
    const formData = ref({
      type: '',
      content: '',
      contact: ''
    })

    // 从localStorage获取我的反馈
    const myFeedbacks = computed(() => {
      const feedbacks = localStorage.getItem('myFeedbacks')
      return feedbacks ? JSON.parse(feedbacks) : []
    })

    const handleSubmit = () => {
      const feedbacks = myFeedbacks.value
      const newFeedback = {
        id: 'f' + Date.now(),
        type: formData.value.type,
        content: formData.value.content,
        contact: formData.value.contact,
        time: new Date().toLocaleString('zh-CN'),
        status: '已受理',
        reply: ''
      }
      
      feedbacks.unshift(newFeedback)
      localStorage.setItem('myFeedbacks', JSON.stringify(feedbacks))
      
      alert('反馈提交成功！我们会尽快处理')
      formData.value = { type: '', content: '', contact: '' }
    }

    return {
      feedbackData: data,
      formData,
      myFeedbacks,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.feedback-page {
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

.feedback-form-section {
  margin-bottom: 16px;
}

.form-item {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.required {
  color: #f5222d;
}

.form-select,
.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-select:focus,
.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #1989fa;
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.submit-btn {
  width: 100%;
}

.my-feedback-section,
.history-feedback-section {
  margin-bottom: 16px;
}

.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feedback-item {
  padding: 16px;
  background: #f8f8f8;
  border-radius: 6px;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.feedback-time {
  font-size: 12px;
  color: #999;
}

.feedback-content {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 8px;
}

.feedback-status {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.status-text {
  font-weight: 600;
}

.feedback-reply {
  padding: 12px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #1989fa;
}

.reply-label {
  font-size: 12px;
  color: #1989fa;
  font-weight: 600;
  margin-bottom: 6px;
}

.reply-content {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.faq-section {
  margin-bottom: 16px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
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
</style>
