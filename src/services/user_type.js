import { request } from '../utils'

export async function query (params) {

  const id = localStorage.getItem("_id");

  return request('http://139.59.95.113:8080/allRole?_id='+id, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  const id = localStorage.getItem("_id");
  return request('http://139.59.95.113:8080/addRole', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('http://139.59.95.113:8080/deleteRole', {
    method: 'post',
    data: params
  })
}

export async function update (params) {
  return request('http://139.59.95.113:8080/editRole', {
    method: 'post',
    data: params
  })
}
