import { request } from '../utils'
import {BASE_URL, CLIENT_ID} from '../CommonMethods/api'

export async function query (params) {
  return request(BASE_URL+'/allZone?clientId='+CLIENT_ID, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  //alert("region service")
  //delete params.key;
  console.log("params = ",params)
  return request(BASE_URL+'/addZone', {
    method: 'post',
    data: params
  })
}

// export async function remove (params) {
//   return request('/api/users', {
//     method: 'delete',
//     data: params
//   })
// }

export async function update (params) {
  return request(BASE_URL+'/editZone', {
    method: 'post',
    data: params
  })
}
