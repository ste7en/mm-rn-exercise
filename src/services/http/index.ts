import axios from 'axios'
import Config from 'react-native-config'

const {
  API_KEY_PARAM_NAME,
  API_KEY_PARAM_VALUE,
  BASE_URL
} = Config

export const httpClient = axios.create({
  baseURL: BASE_URL,
  params: { [API_KEY_PARAM_NAME]: API_KEY_PARAM_VALUE }
})
