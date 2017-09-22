<template>
  <div class="home" v-if="bay">
    <mt-header v-if="!hideHeaderFlag" fixed :title="bay.name"></mt-header>
    <img :src="bay.cover">    
    <div v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="30" >
      <Card v-for="card in cardList" :key="card.id" :card.sync="card" :expand="false" @comment-button="commentButton" @update:card="updateCard"></Card>
    </div>
    <router-link :to="`/share/${bay.id}`">
      <mt-button class="fab-btn"><i class="ion-plus-round"></i></mt-button>
    </router-link>
  </div>
</template>

<script>
import Card from '../components/card'
import Util from '../libs/util.js'

// const storyData = require('../../static/storydb.json')

export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      bay: null,
      storyData: [],
      cardList: [],
      hideHeaderFlag: false,
      position: null
    }
  },
  components: {
    Card
  },
  methods: {
    updateCard (e) {
      console.log(e)
      this.storyData.forEach((c, i) => {
        if (c.id === e.id) {
          console.log(c.id, this.storyData[i])
          this.storyData[i] = e
          console.log(c.id, this.storyData[i])
        }
      })
      this.cardList = this.storyData.slice(0, this.cardList.length)
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        this.cardList = this.storyData.slice(0, this.cardList.length + 5)
        this.loading = false
      }, 500)
    },
    getUser () {
      this.$store.commit('setUser', this.$store.getters.userlocal)
      console.log(this.$store.getters.userlocal)
    },
    getData () {
      Util.ajax.get('/bay', {
        params: {
          user: {
            bayid: parseInt(this.$route.params.id)
          }
        }
      }).then(res => {
        console.log(res)
        this.bay = res.data.data
        this.storyData = res.data.data.storys
        this.cardList = this.storyData.slice(0, 5)
      })
    },
    commentButton (story) {
      console.log('commentButton')
      this.$router.push(`/story/${story.id}`)
    },
    hideHeader () {
      this.hideHeaderFlag = true
    },
    showHeader () {
      this.hideHeaderFlag = false
    },
    onScroll: function (e, position) {
      console.log(e, position)
      this.position = position
    },
    handleScroll () {
      const positionNow = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.direction = positionNow > this.position ? 'up' : 'down'
      if (this.direction === 'down') {
        this.showHeader()
      } else {
        this.hideHeader()
      }
      this.position = positionNow
    }
  },
  mounted () {
    this.getUser()
    this.getData()
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home{
/*  padding: 24px 16px;*/
  height: -webkit-fill-available;
  font-size:0.54rem;
  img{
    width:100%;
  }
  .mint-header {
    height:1rem;
    font-size:0.54rem;
  }
  .fab-btn {
    top: 4.23rem;
    right: 1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    font-size: 0.48rem;
    line-height: 0.48rem;
    position: absolute;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    background-color: #ffd740; 
  }
}
</style>
