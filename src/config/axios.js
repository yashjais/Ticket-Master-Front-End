import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://dct-ticket-master.herokuapp.com'
})

export default axios