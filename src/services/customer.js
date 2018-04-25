import { request } from '../utils'

export async function query (params) {

  const id = localStorage.getItem("_id");

  return request('http://139.59.95.113:8080/allCustomer?_id='+id, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  const id = localStorage.getItem("_id");
  return request('http://139.59.95.113:8080/addCustomer', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('http://139.59.95.113:8080/deleteCustomer', {
    method: 'post',
    data: params
  })
}

export async function update (params) {
  return request('http://139.59.95.113:8080/editCustomer', {
    method: 'post',
    data: params
  })
}