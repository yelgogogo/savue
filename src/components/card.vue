<template>
<div class="card">

  <div class="header">
    <div class="row">
      <div class="col col-20">
        <img class="avatar" :src="card.avatar?card.avatar:'/static/default.jpg'">
      </div>
      <div class="col title">
        <b>{{card.role}}</b>
        <div>{{card.starttime}}</div>
      </div>
      <div class="col col-20 card-visitor">
        <i class="ion-person-stalker"></i>{{card.visitors.length}}
      </div>
    </div>
  </div>

  <div class="content">
    <img class="full-image" src="delorean.jpg">
    <p>
      {{content}}
    </p>
    <div v-if="card.subcontents.length>0 && expandflag">
      <div v-for="sub in card.subcontents">
        <img class="full-image" :src="sub.illustration">
        <p>
          {{sub.content}}
        </p>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="row">
      <div class="col col-20">
        <div v-if="card.description.length > 60">
          <mt-button v-if="!expandflag" size="large" @click="expandCard">
            <i class="ion-ios-arrow-down"></i>
            展开
          </mt-button>
          <mt-button v-else size="large" @click="collapseCard">
            <i class="ion-ios-arrow-up"></i>
            收起
          </mt-button>
        </div>
      </div>
      <div class="col">
      </div>
      <div class="col col-20">
        <mt-button size="large">
          <div v-if="card.likes.length>0">
            <i class="ion-ios-heart-outline"></i>
            <i class="ion-ios-heart"></i>
            {{card.likes.length}} 
          </div>
          <div v-else>

          </div>
          
        </mt-button>
      </div>
      <div class="col col-20">
        <mt-button size="large">
          <i class="ion-ios-list-outline"></i>
          {{card.comments.length}}
        </mt-button>
      </div>
    </div>
  </div>

</div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      default: function () {
        return {}
      }
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expandflag: this.expand
    }
  },
  computed: {
    content: function () {
      return (this.card.description.length > 60 && !this.expandflag) ? this.card.description.substr(0, 60) + '...' : this.card.description
    }
  },
  methods: {
    expandCard () {
      this.expandflag = true
    },
    collapseCard () {
      this.expandflag = false
    }
  }
}
</script>
<style scoped lang="scss">
$notice-color: #919191;
$notice-font-size:0.30rem;

.card {
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  -webkit-transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
  transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
  will-change: box-shadow;
  display: block;
  position: relative;
 /* padding: 0.24rem; */
  border-radius: 2px;
  font-family: Roboto,Helvetica Neue,sans-serif;
  font-size:0.54rem;
  margin: 0.24rem 0.16rem;
  text-align:left;
  overflow: hidden;
  .header {
    padding: 0.24rem 0.24rem 0 0.24rem;

    .row{
      .col{
        .avatar{
          background-size: cover;
          width: 1.20rem;
          height: 1.20rem;
          border-radius: 50%;
        }

      }
      
      .title {
        line-height:0.60rem;
        font-size:$notice-font-size;
      }

      .card-visitor{
        font-size:$notice-font-size;
        color:$notice-color;
        text-align:right;
      }

    }
    .avatar{
 
    }

  }

  .content {  
    white-space: pre-line;
    .full-image {
      width: 100%
    }
    p {
      padding: 0.24rem;
      margin: 0 0 0.24rem 0;
    }
  }

  .footer {
    .mint-button{
      font-size:$notice-font-size;
    }
    
    padding: 0 0 0.24rem 0;

  }
}
</style>