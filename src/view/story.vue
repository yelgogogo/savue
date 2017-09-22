<template>
  <div class="story" v-if="card">
    <mt-header v-if="!hideHeaderFlag" fixed :title="card.title">
      <router-link :to="`/home/${card.bayid}`" slot="left">
        <mt-button class="header-btn">&nbsp;&nbsp;<i class="ion-ios-arrow-left"></i></mt-button>
      </router-link>
      <mt-button class="header-btn" slot="right"><i class="ion-ios-more"></i>&nbsp;&nbsp;</mt-button>
    </mt-header>
    <Card :card.sync="card" :expand="true" @comment-button="showAddComment"></Card>
    <div>
      <Like :like="card.likes"></Like>
    </div>
    <Comment v-for="comment in card.comments" :comment="comment" :key="card.id">
    </Comment>
    <div v-if="card.comments.length===0" class="need-comment">
      快来添加一条评论吧
    </div>
    <div class="footer row" v-if="showAddCommentFlag">
      <div class="col">
        <autoTextarea v-model="addcomment" class="footer-text" :fontSize="'0.54rem'" :autofocus="true" :rows="5"></autoTextarea> 
      </div>
      <div class="col col-20 footer-button">
        <mt-button v-if="addcomment" :type="addcomment?'primary':'default'" :disabled="!addcomment" size="large" @click="submitComment">发送</mt-button>
        <mt-button v-else type="default" size="large" @click="cancelComment">取消</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/card'
import Comment from '../components/comment'
import autoTextarea from '../components/auto-textarea'
import Util from '../libs/util.js'
import Like from '../components/like'
// const storyData = require('../../static/storydb.json')

export default {
  name: 'Story',
  data () {
    return {
      loading: false,
      card: null,
      storyData: null,
      cardList: [],
      hideHeaderFlag: false,
      position: null,
      addcomment: null,
      showAddCommentFlag: false
    }
  },
  components: {
    Card,
    Comment,
    autoTextarea,
    Like
  },
  computed: {
    user () {
      return this.$store.getters.userlocal
    }
  },
  methods: {
    showAddComment () {
      this.showAddCommentFlag = true
    },
    submitComment () {
      this.showAddCommentFlag = false
      const today = new Date()
      let newcomment = {}
      console.log(this.user)
      newcomment.owner = this.user.name
      newcomment.ownerid = this.user.id
      newcomment.role = this.user.nickname
      newcomment.avatar = this.user.avatar
      newcomment.storyid = this.card.id
      newcomment.comment = this.addcomment
      newcomment.starttime = today.toLocaleString()
      Util.ajax.post('/comment',
        newcomment
      ).then(res => {
        console.log(res)
        this.card = res.data.data
      })
    },
    cancelComment () {
      this.showAddCommentFlag = false
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
    getDate () {
      Util.ajax.get('/storybyid', {
        params: {
          id: {
            id: parseInt(this.$route.params.id)
          }
        }
      }).then(res => {
        console.log(res)
        this.card = res.data.data
      })
    },
    commentButton: function (storyId) {
      console.log('commentButton')
      this.$router.push(`/story/${storyId}`)
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
    this.getDate()
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../style.scss";

.story{
/*  padding: 24px 16px;*/
  height: -webkit-fill-available;
  font-size:$common-font-size;
  img{
    width:100%;
  }
  .mint-header {
    height:1rem;
    font-size:inherit;
    .mint-button {
      height: -webkit-fill-available;
      font-size:$header-icon-size;
    }
  }
  .need-comment{
    font-size: $notice-font-size;
    color: $notice-color;
    padding: $notice-font-size;
    margin: $notice-font-size;
  }
  .footer {
    .footer-text {
      width:100%;
      font-size:0.54rem;
    }
    position: fixed;
    bottom: 0;
    width: 100%;
    height: auto;
    background:$bg-color;
    .footer-button {
      margin-top:0px;
    }
    
  }
}

</style>
