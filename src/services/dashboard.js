import {request} from '../utils'
import {BASE_URL, CLIENT_ID} from '../CommonMethods/api'

export async function queryWeather(params) {
  return request('http://query.yahooapis.com/v1/public/yql', {
    method: 'get',
    weather: true,
    data: params
  })
}

export async function query(params) {
  return request('/api/dashboard', {
    method: 'get',
    data: params
  })
}
export async function queryRegion(params) {
  return request('http://139.59.95.113:8080/allRegion', {
    method: 'get',
    data: params
  })
}
  export async function allUser(params) {
   const id=localStorage.getItem("_id");
   const customerId=localStorage.getItem("customerId");
    
    return request(BASE_URL+'/getCount?_id=' +id, {
      method: 'get',
      data: params
    })
 }
