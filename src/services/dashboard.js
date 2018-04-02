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
    return request(BASE_URL+'/getCount?clientId='+CLIENT_ID, {
      method: 'get',
      data: params
    })
 }
