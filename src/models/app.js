import {login, userInfo, logout,create,query} from '../services/app'
import {parse} from 'qs'


// console.log(localStorage.getItem('sberrAdminSiderFoldRight') == null ? 'false': localStorage.getItem('berrAdminSiderFoldRight'));

export default {
  namespace : 'app',
  state : {
    ishidden:false,
    login:false,
    loading:false,
    lock:false,
    SignUp:false,
    modules:JSON.parse(localStorage.getItem("modules")||"[]"),
    modalVisible: false,
    modalType: 'create',
    id:localStorage.getItem("_id"),
    user: {
      name:localStorage.getItem("username")
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('berrAdminSiderFold') === 'true',
    siderFoldRight: localStorage.getItem('berrAdminSiderFoldRight') == null ? 'false': localStorage.getItem('berrAdminSiderFoldRight'),
    menuTheme: localStorage.getItem('berrAdminMenuTheme')=="" ?  'dark': localStorage.getItem('berrAdminMenuTheme'),
    headerTheme: localStorage.getItem('berrAdminHeaderTheme')=="" ?  'dark': localStorage.getItem('berrAdminHeaderTheme'),
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys:JSON.parse(localStorage.getItem('navOpenKeys') || '[]'), //The sidebar menu opens the keys
  },



  subscriptions : {
    setup({dispatch}) {
      dispatch({type:"login"})
      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
  },
  effects : {
    *login({ payload }, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      const data = yield call(login, parse(payload))
      console.log(data,"after login");
      var body=[];
      
      if(data.data){
         body=data.data.module;
         localStorage.setItem("modules",JSON.stringify(body));
        }
      console.log(body,"lllkkdjdh");
      
      if (data.success) { 
        
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name:payload.emailId
            },
            id:data.data._id
          }
        })
      } else {
        yield put({type:'loginFail'})
      }
    },
    *queryUser({ payload }, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(userinfo, parse(payload))
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username
            },
            id:data._id
          }
        })
      }
      yield put({type: 'hideLoading'})
    },
    *logout({ payload }, {call, put}) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({type: 'logoutSuccess'})
      }
    },
    *switchSider({ payload }, {put}) {
      yield put({type: 'handleSwitchSider'})
    },
    *switchSiderRight({ payload }, {put}) {
      yield put({type: 'handleSwitchSiderRight'})
    },
    *changeTheme({ payload }, {put}) {
      //console.log(payload.theme);
      yield put({type: 'handleChangeTheme', payload: { theme:payload.theme }})
    },
    *changeThemeHeader({ payload }, {put}) {
      //console.log(payload.theme);
      yield put({type: 'handleChangeThemeHeader', payload: { theme:payload.theme }})
    },
    *changeLock({
      payload
    }, {put}) {
      yield put({type: 'handleLock'})
    },
    *changeSignUp({
      payload
    }, {put}) {
      yield put({type: 'handleSignUp'})
    },
    *changeNavbar({
      payload
    }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver({ payload }, {put}) {
      yield put({type: 'handleSwitchMenuPopver'})
    },
    *switchMenuPopverRight({ payload }, {put}) {
      yield put({type: 'handleSwitchMenuPopverRight'})
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      // console.log('====',payload)
      const data = yield call(create, payload)
      // const data2 = yield call(query, parse(payload))
      if (data && data.success) {
        //console.log('====',data2)
        yield put({ type: 'showLoading' })
        const data = yield call(query, parse(payload))
        if (data) {
          console.log("data in add",data)
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: data.page
            }

          })

        }
      }
    }
  },
 
  reducers : {
    loginSuccess(state, action) {
     localStorage.setItem("username",action.payload.user.name);
     localStorage.setItem("_id",action.payload.id);
     console.log(state,"success state");
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading:false
          
      }
    },
    querySuccess (state, action) {
      
            const {list, pagination} = action.payload
            return { ...state,
              list,
              loading: false,
              pagination: {
                ...state.pagination,
                ...pagination
              }}
          },
    logoutSuccess(state) {
      return {
        ...state,
        login: false
      }
    },
    loginFail(state) {
      console.log(state,"fail");
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
    },
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading(state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider(state) {
      localStorage.setItem('berrAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleSwitchSiderRight(state) {
      localStorage.setItem('berrAdminSiderFoldRight', !state.siderFoldRight)
      return {
        ...state,
        siderFoldRight: !state.siderFoldRight
      }
    },
    handleChangeTheme(state,action) {
      localStorage.setItem('berrAdminMenuTheme', action.payload.theme)
      return {
        ...state,
        menuTheme: action.payload.theme
      }
    },
    handleChangeThemeHeader(state,action) {
      localStorage.setItem('berrAdminHeaderTheme', action.payload.theme)
      return {
        ...state,
        headerTheme: action.payload.theme
      }
    },
    handleLock(state) {
      return {
        ...state,
        lock: !state.lock
      }
    },
    handleSignUp(state) {
      return {
        ...state,
        SignUp: !state.SignUp
      }
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false
      }
    }, 
    showModal (state, action) {
      
      return { ...state, ...action.payload, modalVisible: true }
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
}
