import { request } from '../utils'

export async function query (params) {
  return request('http://139.59.95.113:8080/allUserType?clientId=131', {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  console.log("params = ",params)
  return request('http://139.59.95.113:8080/addUserType', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('http://139.59.95.113:8080/deleteUserType', {
    method: 'post',
    data: params
  })
}

export async function update (params) {
  return request('http://139.59.95.113:8080/editUserType', {
    method: 'post',
    data: params
  })
}
