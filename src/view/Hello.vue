<template>
  <div class="home">
    <mt-header fixed title="固定在顶部"></mt-header>
    

      <div v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
        <Card v-for="card in cardList" :card="card" :expand="false"></Card>
      </div>

  </div>
</template>

<script>
import Card from '../components/card'
const storyData = require('../../static/storydb.json')

export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      cardList: storyData.slice(0, 5)
    }
  },
  components: {
    Card
  },
  methods: {
    loadMore () {
      this.loading = true
      setTimeout(() => {
        this.cardList = storyData.slice(0, this.cardList.length + 5)
        this.loading = false
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  padding: 24px 16px;
  height: -webkit-fill-available;
}
</style>
