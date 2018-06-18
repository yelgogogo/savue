<template>
  <div class="share">
    <mt-header fixed title="分享你的故事">
      <router-link :to="`/home/${$route.params.id}`" slot="left">
        <mt-button class="header-btn">&nbsp;&nbsp;<i class="ion-ios-arrow-left"></i></mt-button>
      </router-link>
    </mt-header>
    <div class="title">
      <autoTextarea v-model="title" :rows="2" :autofocus="true" placeholder="标题"></autoTextarea>
    </div>
    <div>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="cover" :src="cover" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="description">
      <autoTextarea v-model="description" :rows="0" :autofocus="true" placeholder="分享你的故事"></autoTextarea> 
    </div>
    <div class="save-box">
        <mt-button @click.native="saveStory" class="save-btn" type="primary">分享</mt-button>
    </div>
  </div>
</template>

<script>
import Card from '../components/card'
import Util from '../libs/util.js'
import autoTextarea from '../components/auto-textarea'
import moment from 'moment'

// const storyData = require('../../static/storydb.json')

export default {
  name: 'Share',
  data () {
    return {
      loading: false,
      bay: null,
      storyData: [],
      cardList: [],
      userInfo: {
        nickname: '1',
        openid: '2'
      },
      hideHeaderFlag: false,
      position: null,
      title: null,
      description: null,
      cover: '',
      uploadUrl: 'http://localhost:3811/upload'
    }
  },
  components: {
    Card,
    autoTextarea
  },
  methods: {
    saveStory () {
      const addStory = {
        comments: [],
        title: this.title,
        delflag: false,
        description: this.description,
        cover: this.cover,
        bayid: parseInt(this.$route.params.id),
        owner: this.userInfo.nickname,
        ownerid: this.userInfo.openid,
        starttime: moment().format('YYYY-MM-DD HH:mm:ss'),
        visitors: [],
        moneyimg: '',
        likes: []
      }
      Util.ajax.post('/addStory', addStory).then(res => {
        if (res.data.code === 0) {
          this.$router.push('/home/' + this.$route.params.id)
        }
      })
      console.log(addStory)
    },
    setUserInfo () {
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    },
    getUserInfo () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log(this.userInfo)
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
    },
    handleAvatarSuccess (res, file) {
      console.log(Util)
      console.log(Util.ajax.defaults.baseURL)
      this.cover = Util.ajax.defaults.baseURL + '/' + res.path
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  created () {
    this.setUserInfo()
  },
  mounted () {
    this.getUserInfo()
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../style.scss";
.save-box {
  position: absolute;
  bottom: 60px;
  width: 100%;

}
.save-btn {
  width: 90%;
}
.mint-field {
  .mint-cell-value {
    font-size: 36px!important;
  }
}
.share{
  width: 100%;
  background-color: $bg-color;
  height: -webkit-fill-available;
  font-size:36px;
  img{
    width:100%;
  }
  .title {
    width: 100%;
    box-sizing: border-box;
    padding: $common-padding;
  }
  .description {
    width: 100%;
    box-sizing: border-box;
    padding: $common-padding;
  }
}

</style>
