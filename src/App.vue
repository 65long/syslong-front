<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 页面刷新前缓存和赋值
    this.beforeUnload()
  },
  methods: {
    beforeUnload() {
      // 监听页面刷新
      window.addEventListener('beforeunload', () => {
        // visitedViews数据结构太复杂无法直接JSON.stringify处理，先转换需要的数据
        const tabViews = this.$store.state.tagsView.visitedViews.map(item => {
          return {
            fullPath: item.fullPath,
            hash: item.hash,
            meta: { ...item.meta },
            name: item.name,
            params: { ...item.params },
            path: item.path,
            query: { ...item.query },
            title: item.title
          }
        })
        sessionStorage.setItem('tabViews', JSON.stringify(tabViews))
      })
      // 页面初始化加载判断缓存中是否有数据
      const oldViews = JSON.parse(sessionStorage.getItem('tabViews')) || []
      if (oldViews.length > 0) {
        this.$store.state.tagsView.visitedViews = oldViews
      }
    }
  }
}
</script>
