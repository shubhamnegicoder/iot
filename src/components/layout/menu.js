import React from 'react'
import { Menu, Icon, Switch } from 'antd'
import { Link } from 'dva/router'
import { menu } from '../../utils'
import find from 'lodash/find';

const topMenus = menu.map(item => item.key)
console.log(topMenus, "top");
const getMenus = function (menuArray, siderFold, modules,selector,parentPath) 
{ console.log("err");
  parentPath = parentPath||'/'
 if(selector)
  {
    return menuArray.map(element => 
      { console.log(element,"elly")
       for(var i=0;i<modules.length;i++)
       {
         if (element.key =="user" || element.key =="user_type"||element.key=="customer")
        {
          console.log("sucsess");
        if (element.child) 
        {
          console.log("suc", element.icon);
          return (
            <Menu.SubMenu
              key={element.key}
              title={<span> {
                element.icon ? <Icon type={element.icon} /> : ''
              }
                {
                  siderFold && topMenus.indexOf(element.key) >= 0
                    ? ''
                    : element.name
                } </span>}>
              {/* {console.log(item.key, "item")} */}
              {getMenus(element.child, siderFold, modules,selector, parentPath + element.key + '/')}
            </Menu.SubMenu>
          )
        } else {
          console.log("else");
          return (
            <Menu.Item key={element.key}>

              <Link to={parentPath + element.key}>
                {element.icon
                  ? <Icon type={element.icon} />
                  : ''}
                {siderFold && topMenus.indexOf(element.key) >= 0
                  ? ''
                  : element.name}
              </Link>
            </Menu.Item>
          )
        }
      }

      else if (element.key=="dashboard")
      {
        console.log("false");
        return (
          <Menu.Item key={element.key}>
            <Link to={parentPath + element.key}>
              {element.icon
                ? <Icon type={element.icon} />
                : ''}
              {siderFold && topMenus.indexOf(element.key) >= 0
                ? ''
                : element.name}
            </Link>
          </Menu.Item>
         )
        }
      }
    
  })
 }
} 
  // return menuArray.map(item => { 
//       for(var j=0;j<menuArray.length;j++)
//     {  
//         console.log(modules[j].name.toLowerCase(),j,"menua");
//       for(var i=0;i<modules.length;i++)
//       {
//       if (menuArray[j].key == modules[i].name.toLowerCase()) 
//       {
//           console.log("sucsess");
//         if (menuArray[j].child) {
//           console.log("suc", menuArray[j].icon);
//           return (
//             <Menu.SubMenu
//               key={menuArray[j].key}
//               title={<span> {
//                 menuArray[j].icon ? <Icon type={menuArray[j].icon} /> : ''
//               }
//                 {
//                   siderFold && topMenus.indexOf(menuArray[j].key) >= 0
//                     ? ''
//                     : menuArray[j].name
//                 } </span>}>
//               {/* {console.log(item.key, "item")} */}
//               {getMenus(menuArray[j].child, siderFold, modules, parentPath + menuArray[j].key + '/')}
//             </Menu.SubMenu>
//           )
//         } else {
//           console.log("else");
//           return (
//             <Menu.Item key={menuArray[j].key}>

//               <Link to={parentPath + menuArray[j].key}>
//                 {item.icon
//                   ? <Icon type={menuArray[j].icon} />
//                   : ''}
//                 {siderFold && topMenus.indexOf(menuArray[j].key) >= 0
//                   ? ''
//                   : menuArray[j].name}
//               </Link>
//             </Menu.Item>
//           )
//         }
//       }
      
//       else {
//         console.log("false");
//         return (
//           <Menu.Item key={menuArray[j].key}>
//             <Link to={parentPath + menuArray[j].key}>
//               {menuArray[j].icon
//                 ? <Icon type={menuArray[j].icon} />
//                 : ''}
//               {siderFold && topMenus.indexOf(menuArray[j].key) >= 0
//                 ? ''
//                 : menuArray[j].name}
//             </Link>
//           </Menu.Item>
//         )

//       }
//     }
//  }
 

function Menus({
  siderFold,
  darkTheme,
  menuTheme,
  location,
  isNavbar,
  setting,
  selector,
  handleClickNavMenu,
  navOpenKeys,
  changeSignUp,
  changeOpenKeys,
  modules
}) {
 
  var menuItems = getMenus(menu, siderFold, modules,selector);
  console.log(menuItems, "menues");
  const onOpenChange = (openKeys)=>{
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
