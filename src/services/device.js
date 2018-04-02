import { request } from '../utils'

export async function query (params) {
  return request('http://139.59.95.113:8080/allDevice?clientId=131', {
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
