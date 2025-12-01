<template>
  <div class="join-page">
    <div class="page-header">
      <h1 class="page-title">我要参与</h1>
      <p class="page-subtitle">共建美好社区，从这里开始</p>
    </div>

    <!-- 当前可报名项 -->
    <div class="apply-section card">
      <h2 class="card-title">{{ applyTypeText }}报名</h2>
      <p class="apply-desc">填写以下信息完成报名，提交后请等待公示</p>

      <form class="apply-form" @submit.prevent="handleSubmit">
        <div 
          v-for="field in joinData.applyForm" 
          :key="field.field"
          class="form-item"
        >
          <label class="form-label">
            {{ field.name }}
            <span v-if="field.required" class="required">*</span>
          </label>
          <input
            v-model="formData[field.field]"
            type="text"
            class="form-input"
            :placeholder="field.placeholder"
            :required="field.required"
          />
        </div>

        <button type="submit" class="btn btn-primary submit-btn">
          提交报名
        </button>
      </form>
    </div>

    <!-- 投票环节 -->
    <div v-if="joinData.votingStatus" class="voting-section card">
      <h2 class="card-title">业委会委员候选人投票</h2>
      <p class="vote-desc">请选择您支持的候选人（可多选，最多选5人）</p>

      <div class="candidates">
        <div 
          v-for="candidate in joinData.mockVotes" 
          :key="candidate.candidateName"
          class="candidate-item"
          :class="{ selected: selectedCandidates.includes(candidate.candidateName) }"
          @click="toggleCandidate(candidate.candidateName)"
        >
          <div class="candidate-info">
            <h3 class="candidate-name">{{ candidate.candidateName }}</h3>
            <p class="candidate-desc">{{ candidate.candidateInfo }}</p>
          </div>
          <div class="candidate-check">
            <span v-if="selectedCandidates.includes(candidate.candidateName)">✓</span>
          </div>
        </div>
      </div>

      <button class="btn btn-success submit-btn" @click="handleVote">
        提交投票
      </button>
    </div>

    <!-- 当前投票结果 -->
    <div v-if="!joinData.votingStatus" class="vote-result-section card">
      <h2 class="card-title">当前投票情况（模拟数据）</h2>
      <div class="vote-results">
        <div 
          v-for="candidate in joinData.mockVotes" 
          :key="candidate.candidateName"
          class="result-item"
        >
          <div class="result-header">
            <span class="result-name">{{ candidate.candidateName }}</span>
            <span class="result-count">{{ candidate.voteCount }}票</span>
          </div>
          <div class="result-bar">
            <div class="result-fill" :style="{ width: candidate.percent + '%' }"></div>
          </div>
          <div class="result-percent">{{ candidate.percent }}%</div>
        </div>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="tips-section card">
      <h3 class="card-title">📌 温馨提示</h3>
      <ul class="tips-list">
        <li>报名信息请如实填写，提交后将进行审核</li>
        <li>报名成功后将在5个工作日内公示</li>
        <li>如有疑问，请在"意见反馈"中咨询</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import joinData from '../mock/join.mock.json'

export default {
  name: 'JoinPage',
  setup() {
    const router = useRouter()
    const data = ref(joinData.joinData)
    const formData = ref({})
    const selectedCandidates = ref([])

    const applyTypeText = ref(
      data.value.currentApplyType === 'initiator' ? '发起人' : '筹备组成员'
    )

    const handleSubmit = () => {
      // 保存到localStorage模拟提交
      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]')
      submissions.push({
        ...formData.value,
        type: data.value.currentApplyType,
        time: new Date().toISOString()
      })
      localStorage.setItem('submissions', JSON.stringify(submissions))
      
      alert('报名提交成功！请等待审核公示')
      formData.value = {}
    }

    const toggleCandidate = (name) => {
      const index = selectedCandidates.value.indexOf(name)
      if (index > -1) {
        selectedCandidates.value.splice(index, 1)
      } else {
        if (selectedCandidates.value.length < 5) {
          selectedCandidates.value.push(name)
        } else {
          alert('最多只能选择5位候选人')
        }
      }
    }

    const handleVote = () => {
      if (selectedCandidates.value.length === 0) {
        alert('请至少选择一位候选人')
        return
      }
      
      // 保存投票到localStorage
      localStorage.setItem('myVote', JSON.stringify(selectedCandidates.value))
      alert('投票提交成功！')
      router.push('/progress')
    }

    return {
      joinData: data,
      formData,
      selectedCandidates,
      applyTypeText,
      handleSubmit,
      toggleCandidate,
      handleVote
    }
  }
}
</script>

<style scoped>
.join-page {
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

.apply-section {
  margin-bottom: 16px;
}

.apply-desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 20px;
}

.apply-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.required {
  color: #f5222d;
  margin-left: 4px;
}

.form-input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #1989fa;
}

.submit-btn {
  width: 100%;
  margin-top: 8px;
}

.voting-section {
  margin-bottom: 16px;
}

.vote-desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 16px;
}

.candidates {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.candidate-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.candidate-item.selected {
  border-color: #1989fa;
  background: #e6f7ff;
}

.candidate-info {
  flex: 1;
}

.candidate-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

.candidate-desc {
  font-size: 13px;
  color: #999;
}

.candidate-check {
  width: 24px;
  height: 24px;
  border: 2px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #1989fa;
}

.candidate-item.selected .candidate-check {
  border-color: #1989fa;
  background: #1989fa;
  color: white;
}

.vote-result-section {
  margin-bottom: 16px;
}

.vote-results {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-item {
  padding: 12px;
  background: #f8f8f8;
  border-radius: 6px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.result-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.result-count {
  font-size: 14px;
  color: #1989fa;
  font-weight: 600;
}

.result-bar {
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}

.result-fill {
  height: 100%;
  background: #1989fa;
  transition: width 0.3s;
}

.result-percent {
  text-align: right;
  font-size: 12px;
  color: #999;
}

.tips-section {
  margin-bottom: 16px;
}

.tips-list {
  list-style: none;
  padding: 0;
}

.tips-list li {
  padding-left: 16px;
  position: relative;
  font-size: 13px;
  color: #666;
  line-height: 2;
}

.tips-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #1989fa;
}
</style>
