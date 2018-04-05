import { request } from '../utils'
import {BASE_URL, CLIENT_ID} from '../CommonMethods/api'
export async function query (params) {

 const  id=localStorage.getItem("_id");
  console.log(id,"underscoreid");
  return request(BASE_URL+'/allAssetType?_id='+id, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request(BASE_URL+'/addAssetType', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request(BASE_URL+'/deleteAssetType', {
    method: 'post',
    data: params
  })
}

export async function update (params) {
  return request(BASE_URL+'/updateAssetType', {
    method: 'post',
    data: params
  })
}
