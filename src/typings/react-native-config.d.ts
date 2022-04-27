declare module 'react-native-config' {
  const Config: {
    ENV: 'development' | 'preproduction' | 'production'
    API_KEY_PARAM_NAME: string
    API_KEY_PARAM_VALUE: string
    BASE_URL: string
    N_TO_WIN: number
  }
  export default Config
}
