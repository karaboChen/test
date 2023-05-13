import axios from 'axios'

const instance = axios.create({
  baseURL:'https://vue3-course-api.hexschool.io/',
  timeout: 5000,
})



export default  instance