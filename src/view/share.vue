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
  </div>
</template>

<script>
import Card from '../components/card'
import Util from '../libs/util.js'
import autoTextarea from '../components/auto-textarea'

// const storyData = require('../../static/storydb.json')

export default {
  name: 'Share',
  data () {
    return {
      loading: false,
      bay: null,
      storyData: [],
      cardList: [],
      hideHeaderFlag: false,
      position: null,
      title: null,
      description: null,
      cover: '',
      uploadUrl: 'http://nstart.cc:8090/upload'
    }
  },
  components: {
    Card,
    autoTextarea
  },
  methods: {
    submit () {
      const addStory = {
        comments : [],
        title: this.title,
        delflag : false,
        description: this.description,
        cover : this.cover,
        bayid : this.$route.params.id,
        owner : '',
        ownerid : '',
        starttime : '',
        visitors : [],
        moneyimg : '',
        likes : []
      }
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
    },
    handleAvatarSuccess (res, file) {
      this.cover = URL.createObjectURL(file.raw)
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
  mounted () {
    this.getUser()
    this.getData()
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../style.scss";

.mint-field {
  .mint-cell-value {

    font-size: 0.36rem !important;
  }
}
.share{
  width: 100%;
  background-color: $bg-color;
  height: -webkit-fill-available;
  font-size:0.54rem;
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
    background-color: $accent-color; 
  }
}
</style>
