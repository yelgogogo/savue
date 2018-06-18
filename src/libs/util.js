import axios from 'axios'
import env from '../config/env'

let util = {}
util.title = function (title) {
  title = title ? title + ' - Home' : 'iView project'
  window.document.title = title
}

const ajaxUrl = env === 'development' ? 'http://localhost:3811' : env === 'production' ? 'http://www.starstech.tech:3812' : 'http://www.starstech.tech:3812'

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

export default util

