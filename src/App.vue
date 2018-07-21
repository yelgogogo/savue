<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "../style.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

body {
  margin: 0;
}

.el-textarea__inner{
  font-size:40px;
}

p { 
  max-height: 999999px; 
}

.mint-field {
  .mint-cell-value {
    font-size: $common-font-size !important;
  }
}
</style>
