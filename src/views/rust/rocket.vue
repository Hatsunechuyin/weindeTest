<template>
  <div class="app-container">
      <h1>rocketAPI测试页面</h1>
  </div>
</template>

<script>
import { rocketTest } from '@/api/rust/rocket'
export default {
  name: 'Access',
  components: { },
  data() {
    return {
      data: null
    }
  },
  created() {
    this.testApi()
  },
  methods: {
    async testApi() {
        await rocketTest().then(res => {
            console.log('**************')
            console.log(res)
        }).catch( err=> {
            console.log('--------------')
            console.log(err)
        } )
    }
  }
}
</script>

<style scoped>

</style>
