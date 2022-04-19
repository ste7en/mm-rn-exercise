import nock from 'nock'
import Config from 'react-native-config'

import { httpClient } from '.'

describe('http client init test', () => {
  beforeAll(() => nock.disableNetConnect())
  afterAll(() => nock.enableNetConnect())

  it('should perform a request', async () => {
    const scope = nock('http://localhost').get('/').query({ [Config.API_KEY_PARAM_NAME]: Config.API_KEY_PARAM_VALUE }).reply(200)
    await httpClient.get('/')
    expect(scope.isDone()).toBe(true)
  })

  it('should perform a request with params', async () => {
    const scope = nock('http://localhost').get('/').query({ [Config.API_KEY_PARAM_NAME]: Config.API_KEY_PARAM_VALUE }).reply(200)
    await httpClient.get('/')
    expect(scope.isDone()).toBe(true)
  })
})
