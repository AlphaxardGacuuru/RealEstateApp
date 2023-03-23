import axios from 'axios'

const Axios = axios.create({
	// baseURL: process.env.MIX_APP_URL,
	withCredentials: true,
})

export default Axios
