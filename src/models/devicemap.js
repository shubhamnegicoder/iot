import {query } from '../services/devicemap'
import { parse } from 'qs'

export default {
  namespace: 'devicemap',
  state: {
    deviceHistory: [],
    loading: false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        var deviceId = {deviceId: location.query.id}
        if (location.pathname === '/devicemap') {
          dispatch({
            type: 'query',
            payload: deviceId
          })
        }
      })
    }
  },

  effects: {

    *query ({ payload }, { call, put }) {
      //console.log('here',payload)
      yield put({ type: 'showLoading' })
      const data = yield call(query, parse(payload))
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            deviceHistory: data.data
          }
        })
      }
    }
  },

  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    querySuccess (state, action) {

      const {deviceHistory} = action.payload
      return { ...state,
        ...action.payload,
        loading: false,
        }
    }
  }

}
