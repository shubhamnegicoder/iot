import { request } from '../utils'
import {BASE_URL, CLIENT_ID} from '../CommonMethods/api'

export async function query (params) {
  return request(BASE_URL+'/allDeviceData?clientId='+CLIENT_ID, {
    method: 'get',
    data: params
  })
}
