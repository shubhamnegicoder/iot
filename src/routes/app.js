import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import Login from './login'
import Header from '../components/layout/header'
import Dashboard from '../routes/dashboard_1'
import LockPage from '../routes/pages/lockscreen'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import CustomSider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import { Spin, LocaleProvider, Switch } from 'antd'
import { classnames, config } from '../utils'
import '../components/layout/common.less'
import enUS from 'antd/lib/locale-provider/en_US';
import RightSider from '../components/layout/rightSider';
import { Layout,Form,Select,Row,Button,Modal } from 'antd';
import { BackTop } from 'antd';
import {apiFunc, BASE_URL,CLIENT_ID} from '../CommonMethods/api';
import CustomModal from '../components/customer/modal';

const { Sider, Content } = Layout;
const FormItem = Form.Item
var dropDownData=[];
function App({ children, location, dispatch, app }) 
{
  const {
    login,
    loading,
    dropDownData,
    ishidden,
    dashhide,
    selectValue,
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
    selector,
    modalVisible,
    modalType,
    id
  } = app
  // console.log(app,"1");
  const loginProps ={
    dropDownData,
    login,
    loading,
    loginButtonLoading,
     onOk(data) {
         dispatch({type:'app/login',payload: data })
    }
   
  }
  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 14
    }
  }
//  console.log(ishidden,"stategggggggg")
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
      // localStorage.removeItem("modules");
      localStorage.removeItem("username")
      localStorage.removeItem("_id")
      localStorage.removeItem("customerId")
      localStorage.removeItem("modules")
      localStorage.removeItem("dropDownData")
      localStorage.removeItem("selector");
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
    ishidden,
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

  const userModalProps = {
    id,
    modules,
    item: modalType === 'create'
      ? {}
      : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({type: `app/${modalType}`, payload: data})
    },
    onCancel() {
      dispatch({type: 'app/hideModal'})
    }
  }


  
  var handleok=(e)=>{
     dispatch({
       type: 'app/showState',
       payload:e
     })
     dispatch({type:"dashboard/allUser",payload:{ticket:false}})
  
   
    //  window.location.href='./routes/dashboard_1'

   }

  //  console.log(selectValue,"selectstate");
  async function customer(){
    var data2= await apiFunc.getCustomerList();
    // console.log(data2.body.data,"finjdfvndj");
    app.dropDownData=data2.body.data;
    localStorage.setItem("dropDownData",JSON.stringify(app.dropDownData));
   }

   customer();


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
      // console.log(login,"logan")
      return (
        <div>
 
          <div className={styles.spin}>
            <Login {...loginProps} />
          </div>

        </div>
      )
    }
  }
  var onAdd=()=>{
    
     dispatch({
       type: 'app/showModal',
       payload: {
         modalType:'create'
       }
     })
   }

  if (login || (config.needLogin()==false)) {

      // console.log(app,"states app");
      // console.log(config.needLogin(),"config");
    return (
      <div
        className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold  }, {  [styles.withnavbar]: isNavbar  })}>
        {!isNavbar  ? <aside
            className={classnames(styles.sider , (menuTheme=="dark") ? styles.dark : menuTheme=="light" ?  styles.light : "menu_"+menuTheme )} >
            
            <div>
            
                    <Form >
                    <FormItem label='Customer List' hasFeedback {...formItemLayout}>
                    {
                    ( <Select  placeholder="Select customer" onChange={(e)=>{handleok(e)}} >

                      {
                           app.dropDownData && app.dropDownData.length && app.dropDownData.map((item,index)=>{

                        return <Select.Option name={item.customerName} value={item._id} key = {index}><Link to='dashboard'>{item.customerName}</Link></Select.Option>
                      })}
                      </Select>
                       )
                    }
                </FormItem>

                <FormItem>
                   <Button type='primary' size='large' onClick={onAdd}>Add Customer</Button>
                </FormItem>
                  </Form >
                  
                 </div>
                  <CustomSider {...siderProps} />
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
        <CustomModal {...userModalProps}/>
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
