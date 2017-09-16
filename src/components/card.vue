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
    </div>
  </div>

  <div class="content">
    <img class="full-image" src="delorean.jpg">
    <p>
      {{card.description}}
    </p>
  </div>
  <div class="footer">
    <div class="row">
      <div class="col col-offset-33 col-33">
        <mt-button size="large">1 Like</mt-button>
      </div>
      <div class="col col-33">
        <mt-button size="large">5 Comments</mt-button>
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
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped lang="scss">
.card {
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  -webkit-transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
  transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
  will-change: box-shadow;
  display: block;
  position: relative;
  padding: 0.24rem;
  border-radius: 2px;
  font-family: Roboto,Helvetica Neue,sans-serif;
  font-size:0.30rem;
  margin: 24px 16px;
  text-align:left;
  .header {
    .row{
      .col{
        .avatar{
          background-size: cover;
          width: 1.20rem;
          height: 1.20rem;
          border-radius: 50%;
        }

      }
      
      .title{
        line-height:0.60rem;
        font-size:0.30rem;
      }

    }
    .avatar{
 
    }

  }

  .content {  
    white-space: pre-wrap;
  }

  .footer {

  }
}
</style>