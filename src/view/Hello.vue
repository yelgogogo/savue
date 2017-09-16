<template>
  <div class="home">
    <mt-header fixed title="固定在顶部"></mt-header>
    
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div>
        <Card v-for="card in cardList" :card="card"></Card>
      </div>
    </mt-loadmore>
    <mt-button type="default">default</mt-button>
    <mt-button type="default">default</mt-button>
    <mt-button type="primary">primary</mt-button>
    <mt-button type="danger">danger</mt-button>
  </div>
</template>

<script>
import Card from '../components/card'
const storyData = require('../../static/storydb.json')

export default {
  name: 'Home',
  data () {
    return {
      cardList: storyData.slice(0, 5),
      allLoaded: false
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
      }, 2500)
    },
    loadTop () {
      setTimeout(() => {
        this.cardList = storyData.slice(0, this.cardList.length + 5)
        // this.allLoaded = true
        this.$refs.loadmore.onTopLoaded()
      }, 2500)
    },
    loadBottom () {
      setTimeout(() => {
        this.cardList = storyData.slice(0, this.cardList.length + 5)
        // this.allLoaded = true
        this.$refs.loadmore.onBottomLoaded()
      }, 2500)
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
