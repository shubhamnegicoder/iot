import { request } from '../utils'
import {BASE_URL, CLIENT_ID} from '../CommonMethods/api'

export async function query (params) {
  return request(BASE_URL+'/allDeviceRecentData?customerId='+"5abb41e3e517355ba8aab3c0", {
    method: 'get',
    data: params
  })
}
