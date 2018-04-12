import { request } from '../utils'

export async function query (params) {
  const id = localStorage.getItem("_id");
  return request('http://139.59.95.113:8080/allUser?_Id='+id, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request('http://139.59.95.113:8080/addUser', {
    method: 'post',
    data: params 
  })
}

export async function remove (params) {
  return request('http://139.59.95.113:8080/deleteUser', {
    method: 'post',
    data: params
  })
}

export async function update (params) {

  return request('http://139.59.95.113:8080/editUser', {
    method: 'post',
    data: params
  })
}
