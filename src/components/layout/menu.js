import React from 'react'
import { Menu, Icon, Switch } from 'antd'
import { Link } from 'dva/router'
import { menu } from '../../utils'
import find from 'lodash/find';

const topMenus = menu.map(item => item.key)
console.log(topMenus, "top");
const getMenus = function (menuArray, siderFold, modules, parentPath) {
  // console.log(menuArray, "mod");
  // console.log(modules, "module");
  parentPath = parentPath || '/'
  return menuArray.map(item => {

      for(var i=0;i<modules.length;i++)
      {
      if (item.key == modules[i].name.toLowerCase()) {

        if (item.child) {
          // console.log("suc",item.icon);
          return (
            <Menu.SubMenu
              key={item.key}
              title={<span> {
                item.icon ? <Icon type={item.icon} /> : ''
              }
                {
                  siderFold && topMenus.indexOf(item.key) >= 0
                    ? ''
                    : item.name
                } </span>}>
              {/* {console.log(item.key, "item")} */}
              {getMenus(item.child,siderFold,modules,parentPath + item.key + '/')}
            </Menu.SubMenu>
          )
        } else {
          // console.log("else");
          return (
            <Menu.Item key={item.key}>

              <Link to={parentPath + item.key}>
                {item.icon
                  ? <Icon type={item.icon} />
                  : ''}
                {siderFold && topMenus.indexOf(item.key) >= 0
                  ? ''
                  : item.name}
              </Link>
            </Menu.Item>
          )
        }
      }
      
      else {
        // console.log("false");
        return (
          <Menu.Item key={item.key}>
            <Link to={parentPath + item.key}>
              {item.icon
                ? <Icon type={item.icon} />
                : ''}
              {siderFold && topMenus.indexOf(item.key) >= 0
                ? ''
                : item.name}
            </Link>
          </Menu.Item>
        )

      }
    }
   
  })
}

function Menus({
  siderFold,
  darkTheme,
  menuTheme,
  location,
  isNavbar,
  handleClickNavMenu,
  navOpenKeys,
  changeSignUp,
  changeOpenKeys,
  modules
}) {
  // console.log(getMenus(menu, siderFold, modules), "func");
  // console.log(modules,"func");
  var menuItems = getMenus(menu, siderFold, modules)
  // console.log(menuItems, "menues");
  const onOpenChange = (openKeys) => {
    const latestOpenKey = find(openKeys, key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = find(navOpenKeys, key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }
  const getAncestorKeys = (key) => {
    const map = {
      navigation2: ['navigation']
    }
    return map[key] || []
  }
  // When the menu bar is stuck, the open keys can not be manipulated
  let menuProps = !siderFold
    ? {
      onOpenChange,
      openKeys: navOpenKeys
    }
    : {}

  return (
    <div>
      <Menu {...menuProps}
        mode={siderFold ? 'vertical' : 'inline'}
        theme={menuTheme ? menuTheme : "dark"} className={"menu_" + menuTheme}
        onClick={handleClickNavMenu}
        defaultSelectedKeys={[
          location
            .pathname
            .split('/')[
          location
            .pathname
            .split('/')
            .length - 1
          ] || 'dashboard'
        ]}>
        {menuItems}
        {/* {console.log(menuItems,"menu")} */}
      </Menu>
    </div>
  )
}

export default Menus
