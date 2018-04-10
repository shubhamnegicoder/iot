import { request } from '../utils'
import {BASE_URL, CLIENT_ID} from '../CommonMethods/api'

export async function login (params) {
  return request('http://139.59.95.113:8080/login', {
    method: 'post',
    data: params
  })
}
export async function create (params) {
  return request(BASE_URL+'/addCustomer', {
    method: 'post',
    data: params
  })
}

export async function logout (params) {
  return request('/api/logout', {
    method: 'post',
    data: params
  })
}
export async function query (params) {
  return request(BASE_URL+'/allCustomer', {
    method: 'get',
    data: params
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params
  })
}
