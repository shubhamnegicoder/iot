import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Login from './login'
import Header from '../components/layout/header'
import LockPage from '../routes/pages/lockscreen'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import CustomSider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import Select, { Spin, LocaleProvider, Switch } from 'antd'
import { classnames, config } from '../utils'
import '../components/layout/common.less'
import enUS from 'antd/lib/locale-provider/en_US';
import RightSider from '../components/layout/rightSider';
import { Layout } from 'antd';
import { BackTop } from 'antd';
// import { apiFunc, BASE_URL, CLIENT_ID } from '../../CommonMethods/api'

const { Sider, Content } = Layout;
function App({ children, location, dispatch, app }) {
  const {
    login,
    loading,
    loginButtonLoading,
    user,
    siderFold,
    siderFoldRight,
    darkTheme,
    isNavbar,
    menuPopoverVisible,
    menuPopoverVisibleRight,
    navOpenKeys,
    lock,
    setting,
    SignUp,
    modules,
    menuTheme,
    headerTheme,
    selector
  } = app
  console.log(app,"1");
  const loginProps ={
    loading,
    loginButtonLoading,
     onOk(data) {
         dispatch({type:'app/login',payload: data })
    }
   
  }
  
  // if (!count){
  //   options.forEach(element => {
  //     if (element.name.toLowerCase() == "user" || element.name.toLowerCase() == "customer") 
  //     {
  //       selector.push(element.name.toLowerCase());
  //     }
  //   });
  
  
  const headerProps = {
    user,
    siderFold,siderFoldRight,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    setting(){
      dispatch({type:'app/setting'})
      modules.forEach(element => {
        if (element.name.toLowerCase() == "user" || element.name.toLowerCase() == "customer") 
        {
          dispatch({ type: 'app/select',payload:{select:true} })
        }
      });
      //  console.log(selector,"selel");

    },
    logout() {
      alert("logout called");
      dispatch({ type: 'app/logout' })
      localStorage.removeItem("username");
      // localStorage.removeItem("modules");
      window.location.href ="/"
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' })
    },
    switchSiderRight() {
      dispatch({ type: 'app/switchSiderRight' })
    },
    changeLock() {
      dispatch({ type: 'app/changeLock' })
    },
    changeSignUp() {
      dispatch({ type: 'app/changeSignUp' })
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {
          navOpenKeys: openKeys
        }
      })
    },
    changeTheme(value) {
      //console.log(value)
      dispatch({ type: 'app/changeTheme' , payload: {  theme: value  }})
    },
    changeThemeHeader(value) {
      //console.log(value)
      dispatch({ type: 'app/changeThemeHeader' , payload: {  theme: value  }})
    },
    headerTheme,
    menuTheme
  }

  const siderProps = {
    siderFold,
    selector,
    setting,
    location,
    navOpenKeys,
    menuTheme,
    modules,
    changeTheme() {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {
          navOpenKeys: openKeys
        }
      })
    },
    changeLock() {
      dispatch({ type: 'app/changeLock' })
    },
    changeSignUp() {
      dispatch({ type: 'app/changeSignUp' })
    },
     changeTheme(value) {
      //console.log(value)
      dispatch({ type: 'app/changeTheme' , payload: {  theme: value  }})
    },
  }

 

  if (SignUp) {

    return (
      <div>
        <Spin tip='Loading...' spinning={loading} size='large'>
          Signup Page
        </Spin>
      </div>
    )
  } else if (lock) {
    return (
      <div>
        <LockPage/>
      </div>
    )

  } else if (config.needLogin()) {
    if (login == false) {
      console.log(login,"logan")
      return (
        <div>
 
          <div className={styles.spin}>
            <Login {...loginProps} />
          </div>

        </div>
      )
    }
  }

  if (login || (config.needLogin()==false)){
      console.log(app,"states app");
      console.log(config.needLogin(),"config");
    return (
      <div
        className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold  }, {  [styles.withnavbar]: isNavbar  })}>
        {!isNavbar  ? <aside
           className={classnames(styles.sider , (menuTheme=="dark") ? styles.dark : menuTheme=="light" ?  styles.light : "menu_"+menuTheme )} >
           <CustomSider {...siderProps}/>
          </aside>
          : ''}
        <div className={styles.main} id="main_content">
          <div className={styles.spin} >
            <Spin tip='Loading...' spinning={loading} size='large'>
              <Header {...headerProps} />
              <Bread location={location} />
                <div className={styles.container}>
                  <div className={styles.content} id="spin">
                  <BackTop target={()=>document.getElementById('main_content')} />
                    {children}
                  </div>
                </div>
              <Footer />
            </Spin>
          </div>
          <RightSider {...headerProps}/>
        </div>
        
      </div>
    )
  }
  else
  {
    return (
      <div>

        <div className={styles.spin}>
          <Login {...loginProps} />
        </div>

      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  login: PropTypes.bool,
  setting:PropTypes.bool,
  lock: PropTypes.bool,
  SignUp: PropTypes.bool,
  user: PropTypes.object,
  siderFold: PropTypes.bool,
  siderFoldRight: PropTypes.bool,
  darkTheme: PropTypes.bool,
  menuTheme : PropTypes.string
}

export default connect(({ app }) => ({ app }))(App)
