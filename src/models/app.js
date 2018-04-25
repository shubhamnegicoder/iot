import { login, userInfo, logout, create, query } from '../services/app'
import { parse } from 'qs'


// console.log(localStorage.getItem('sberrAdminSiderFoldRight') == null ? 'false': localStorage.getItem('berrAdminSiderFoldRight'));

export default {
  namespace: 'app',
  state: {
    ishidden: false,
    id: localStorage.getItem("_id"),
    dashhide: false,
    visible:false,
    dropDownData: JSON.parse(localStorage.getItem("dropDownData") || "[]"),
    dropflag:true,
    selectValue: "",
    login: false,
    loading: false,
    lock: false,
    SignUp: false,
    selector: false || localStorage.getItem("selector"),
    dashboard: false,
    user: {
      name: localStorage.getItem("username")
    },
    setting: false,
    //     modules:JSON.parse(localStorage.getItem("modules")|| '[]'),
    modules: JSON.parse(localStorage.getItem("modules") || '[]'),
    modalVisible: false,
    modalType: 'create',
    //     user: {
    //       name:localStorage.getItem("username")
    //     },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('berrAdminSiderFold') === 'true',
    siderFoldRight: localStorage.getItem('berrAdminSiderFoldRight') == null ? 'false' : localStorage.getItem('berrAdminSiderFoldRight'),
    menuTheme: localStorage.getItem('berrAdminMenuTheme') == "" ? 'dark' : localStorage.getItem('berrAdminMenuTheme'),
    headerTheme: localStorage.getItem('berrAdminHeaderTheme') == "" ? 'dark' : localStorage.getItem('berrAdminHeaderTheme'),
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]') //The sidebar menu opens the keys
  },



  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: "login" })
      //  dispatch({type:"set"})
      window.onresize = function () {
        dispatch({ type: 'changeNavbar' })
      }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' })
      const data = yield call(login, parse(payload))
      console.log(data,"login data")
      var body=[];
      if(data.data){
         body=data.data.module;
         localStorage.setItem("modules",JSON.stringify(body));
       }
      if (data.success) {
        console.log("if")
        var a = yield put({
          //       if (data.success) { 

          //         yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: payload.emailId
            },
            id: data.data._id
          }
        })
      } else {
        yield put({ type: 'loginFail' })
        console.log("fail");
      }
      // console.log(b,"b");
    },
    // *queryUser({ payload }, {call, put}) {
    //   // yield put({type: 'showLoading'})
    //   const data = yield call(userinfo, parse(payload))
    //   if (data.success) {
    //     yield put({
    //       type: 'loginSuccess',
    //       payload: {
    //         user: {
    //           name: data.username
    //         },
    //         modules:"zio"
    //       }
    //     })
    //   }
    //   yield put({type: 'hideLoading'})
    // },
    *setting({ payload }, { call, put }) {
      yield put({ type: 'set' })
    },
    *select({ payload }, { call, put }) {
      yield put({ type: 'sel', payload: { selector: payload.select } })
    },
    *logout({ payload }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({ type: 'logoutSuccess' })
      }
    },
    *switchSider({ payload }, { put }) {
      yield put({ type: 'handleSwitchSider' })
    },
    *switchSiderRight({ payload }, { put }) {
      yield put({ type: 'handleSwitchSiderRight' })
    },
    *changeTheme({ payload }, { put }) {
      //console.log(payload.theme);
      yield put({ type: 'handleChangeTheme', payload: { theme: payload.theme } })
    },
    *changeThemeHeader({ payload }, { put }) {
      //console.log(payload.theme);
      yield put({ type: 'handleChangeThemeHeader', payload: { theme: payload.theme } })
    },
    *changeLock({
      payload
    }, { put }) {
      yield put({ type: 'handleLock' })
    },
    *changeSignUp({
      payload
    }, { put }) {
      yield put({ type: 'handleSignUp' })
    },
    *changeNavbar({
      payload
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver({ payload }, { put }) {
      yield put({ type: 'handleSwitchMenuPopver' })
    },
    *switchMenuPopverRight({ payload }, { put }) {
      yield put({ type: 'handleSwitchMenuPopverRight' })
    },
    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      // yield put({ type: 'showLoading' })
      // console.log('====',payload)
      const data = yield call(create, payload.data)
      const data2 = yield call(query,payload.data._id)
      console.log(data2,"dataa")
       if (data && data.success) {

          yield put({
            type: 'updatedropdown',
            payload: {
              dropDownData: data2.data
            }

          })

        }
      }
    
  },

  reducers: {
    loginSuccess(state, action) {
      localStorage.setItem("username", action.payload.user.name);
      localStorage.setItem("_id", action.payload.id);
      //  console.log(state,"success state");
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
        modules: JSON.parse(localStorage.getItem("modules"))
      }
    },
    sel(state, action) {
      localStorage.setItem("selector", action.payload.selector)
      return {
        ...state,
        ...action.payload,
      }
    },
    dropDownData(state,action)
    { console.log(action.payload.dropDownData,"payload")
       return{
         ...state,...action.payload
       }
    },
    logoutSuccess(state, action) {
      localStorage.removeItem("dropDownData");
      alert("")
      return {
        ...state,
        ...action.payload,
        login: false,
        ishidden: false,
        setting:false,
        select:false
      }
    },
    set(state) {
      alert("set");
      // localStorage.setItem("setting",action.payload.setting
      return {
        ...state,
        setting: !state.setting,

      }
    },
    //     querySuccess (state, action) {

    //             const {list, pagination} = action.payload
    //             return { ...state,
    //               list,
    //               loading: false,
    //               pagination: {
    //                 ...state.pagination,
    //                 ...pagination
    //               }}
    //           },
    //   logoutSuccess(state) {
    //   return { 
    //            ...state,
    //      ishidden: false,
    //      login: false,
    //   }

    // },
    loginFail(state, action) {
      // console.log(state,"fail");
      return {
        ...state,
        ...action.payload,
        setting: state.setting,
        login: false,
        loginButtonLoading: false
      }
    },
    showState(state, action) {
      localStorage.setItem("customerId", action.payload);
      return {
        ...state,
        ishidden: true,
        dashhide: true,
        setting: false,
        customerId: localStorage.getItem("customerId"),
        selectValue: action.payload
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
    handleChangeTheme(state, action) {
      localStorage.setItem('berrAdminMenuTheme', action.payload.theme)
      return {
        ...state,
        menuTheme: action.payload.theme
      }
    },
    handleChangeThemeHeader(state, action) {
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
    drop(state){
      return{
        ...state,
        visible:!state.visible
      }
    },
    updatedropdown(state,action){
        return{...state,...action.payload}
    },
    showModal(state, action) {

      return { ...state, ...action.payload, modalVisible: true }
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    },
    hideModal(state) {
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
