import axios from 'axios'
import env from '../config/env'

let util = {}
util.title = function (title) {
  title = title ? title + ' - Home' : 'iView project'
  window.document.title = title
}

const ajaxUrl = env === 'development' ? 'http://nstart.cc:8090' : env === 'production' ? 'https://www.url.com' : 'https://debug.url.com'

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

export default util
