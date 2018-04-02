import { request } from '../utils'
import {BASE_URL, CLIENT_ID} from '../CommonMethods/api'

export async function query (params) {
  return request(BASE_URL+'/allAsset?clientId='+CLIENT_ID, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request(BASE_URL+'/addAsset', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request(BASE_URL+'/deleteAsset', {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  console.log("response", params)
  return request(BASE_URL+'/editAsset', {
    method: 'post',
    data: params
  })
}
