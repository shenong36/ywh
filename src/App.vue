<template>
  <div id="app">
    <router-view />
    <TabBar v-if="showTabBar" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './components/TabBar.vue'

export default {
  name: 'App',
  components: {
    TabBar
  },
  setup() {
    const route = useRoute()
    const showTabBar = computed(() => {
      return route.meta.showTabBar !== false
    })

    return {
      showTabBar
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f5f5f5;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
}

#app {
  min-height: 100vh;
  padding-bottom: 60px;
}

.page {
  padding: 16px;
  padding-bottom: 80px;
}

.container {
  max-width: 750px;
  margin: 0 auto;
}
</style>
