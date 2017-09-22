import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser (state, user) {
      state.user = {...user}
    }
  },
  getters: {
    userlocal: state => {
      if (localStorage.getItem('sakura_user')) {
        return JSON.parse(localStorage.getItem('sakura_user'))
      } else {
        let user = {}
        user.id = Date.now()
        user.nickname = '访客'
        user.avatar = '/static/defaultuser.jpg'
        user.badge = 0
        let body = JSON.stringify(user)
        localStorage.setItem('sakura_user', body)
        return user
      }
    }
  }
})

export default store
