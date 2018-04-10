import React from 'react'
import {Icon, Switch} from 'antd'
import styles from './main.less'
import {config} from '../../utils'
import Menus from './menu'

function Sider({siderFold, menuTheme,darkTheme,location, changeTheme,changeLock, setting,selector,navOpenKeys, changeOpenKeys,modules}) {
  const menusProps = {
    siderFold,
    setting,
    selector,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
    menuTheme,
    modules
  }
  return (
    console.log(setting,"set"),
    <div className={"menu_"+ menuTheme} >
      <div className={styles.logo}>
        <img src={config.logoSrc}/> {siderFold ? '' : <span className="logoText">{config.logoText}</span>}
      </div>
      {setting?<Menus {...menusProps}/>:<div></div>}
       {!siderFold ? <div className={styles.switchtheme + " " + "menu_"+ menuTheme}>
       <Switch
              onChange={changeTheme.bind(this, menuTheme=="dark" ? "light":"dark")}
              defaultChecked={!(menuTheme=="dark")}
              checkedChildren='Dark'
              unCheckedChildren='Light' />
          <Switch
          onChange={changeLock}
          checkedChildren={<Icon type="lock" />}
          unCheckedChildren={<Icon type="unlock" />}/>
          </div>
        : ''}
    </div>
  )
}

export default Sider
