import axios from "axios"
import getConfig from 'next/config'
const {
  publicRuntimeConfig: {BASE_URL},  // Available both client and server side
} = getConfig()
axios.defaults.baseURL = `${BASE_URL}/api`;

export default async function handler(req, res) {
    const response = await axios.get('/employee')
    res.status(200).json(response.data)
}