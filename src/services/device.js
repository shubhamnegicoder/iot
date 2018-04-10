import { request } from '../utils'
import {BASE_URL, CLIENT_ID} from '../CommonMethods/api'

export async function query (params) {
  const CLIENT_ID = localStorage.getItem("customerId");
  return request('http://139.59.95.113:8080/allDevice?customerId='+CLIENT_ID, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request('http://139.59.95.113:8080/addDevice', {
    method: 'post',
    data: params
  })
}

// export async function remove (params) {
//   return request('http://139.59.95.113:8080/', {
//     method: 'delete',
//     data: params
//   })
// }

export async function update (params) {

  return request('http://139.59.95.113:8080/editDevice', {
    method: 'post',
    data: params
  })
}
