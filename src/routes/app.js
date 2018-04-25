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
import { Layout,Form,Select,Row,Button,Modal,notification,Dropdown,Icon} from 'antd';
import { BackTop } from 'antd';
import {apiFunc, BASE_URL,CLIENT_ID} from '../CommonMethods/api';
import CustomModal from '../components/customer/modal';

const { Sider, Content } = Layout;
const FormItem = Form.Item
var b= false;
var flag=true;

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
    visible,
    dropflag,
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
      dispatch({type:'app/logout'})
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

  const siderProps={
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
    onOk(data,callback){

      dispatch({ type: `app/${modalType}`, payload: { data: data, dropDownData: app.dropDownData}})
      callback("success")
    },
    onCancel() {
      dispatch({type: 'app/hideModal'})
    },
      notify:(type)=>{  
      notification[type]({
        message: 'Notification',
        description: 'Customer added successfully',
      });
    }
  }


  
  var handleok=(e)=>{
     dispatch({
       type: 'app/showState',
       payload:e
     })
     dispatch({type:"dashboard/allUser",payload:{ticket:false}})

   }

  async function customer(){
    var data2= await apiFunc.getCustomerList();
    app.dropDownData=data2.body.data;
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
 const dropdown=(
<Form>
   <FormItem label='Customer List' hasFeedback {...formItemLayout}>
     {
       (<Select placeholder="Select customer" onChange={(e) => { handleok(e) }} >

         {

           app.dropDownData && app.dropDownData.map((item, index) => {


             return <Select.Option name={item.customerName} value={item._id} key={index}><Link to='dashboard'>{item.customerName}</Link></Select.Option>
           })}
       </Select>
       )
     }
   </FormItem>

   <FormItem>
     {b ? <Button type='primary' icon="user-add" size='large' onClick={() => onAdd('success')}>Add Customer</Button> : <div></div>
     }
   </FormItem>
</Form>
 );
var onAdd=()=>{

     dispatch({
       type: 'app/showModal',
       payload: {
         modalType:'create'
       }
     })
   }
  
   modules.forEach(function(value){
     if(value.name==="Customer"){
       value.permission.forEach(function(value){
         if(value=="POST"){
          b=true;
         }
       })
      
     }
   })
   
  customer();
  var visiblechange=(visible)=>{
      dispatch({type:"app/drop"})
    }


  

  if (login || (config.needLogin()==false)) 
  { 
    localStorage.setItem("dropDownData", JSON.stringify(app.dropDownData));
 
     console.log(app,"app")
        //  dispatch({type:'app/dropDownData'},{payload:{dropDownData:JSON.parse(localStorage.getItem('dropDownData'))}})
            //  if(dropDownData.length>0)
      //  { 
      //    dispatch({ type:'app/dropDownData',payload:{dropDownData:app.dropDownData}})
      //  }
      // console.log(app,"states app");
      // console.log(config.needLogin(),"config");
    return (
      <div
        className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold  }, {  [styles.withnavbar]: isNavbar  })}>
        {!isNavbar  ? <aside className={classnames(styles.sider , (menuTheme=="dark") ? styles.dark : menuTheme=="light" ?  styles.light : "menu_"+menuTheme )} >

            <div >
                <Dropdown overlay={dropdown} onClick={()=>{visiblechange(app.visible)}} visible={app.visible} trigger={['click']}>
              <Button type="primary">
                    Add Customer <Icon type="down" />
                  </Button>
                </Dropdown>
                    
          </div>
                  <CustomSider {...siderProps} />
          </aside>: ''}
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
