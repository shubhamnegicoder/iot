import React from 'react'
import { Menu, Icon, Switch } from 'antd'
import { Link } from 'dva/router'
import { menu } from '../../utils'
import find from 'lodash/find';

const topMenus = menu.map(item => item.key)
// console.log(topMenus, "top");
var childs = [];



const getMenus = function (menuArray,siderFold,modules,selector,setting,ishidden,parentPath) 
{  
  // console.log(childs,"array")

  parentPath = parentPath||'/'
 if(setting)
 {
  if(selector)
  {
      // console.log("selector")
    return menuArray.map(item => {
      for (var i = 0; i < modules.length; i++) {
        // console.log(item,"item")
        if ((item.key == modules[i].name.toLowerCase()) && (item.key !== "asset") && (item.key !== "device")  || (item.key == "dashboard")) 
        {
          //  console.log("itemkey",item.key)
          if (item.child) {
          childs.length = 0;
            item.child.map((item) => {
              childs.push(item);
            })
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
                {getMenus(item.child, siderFold, modules, selector, setting, ishidden, parentPath + item.key + '/')}
              </Menu.SubMenu>
            )

          } else {
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
          // console.log("else")
          for (var j = 0; j < childs.length; j++) {
            if (item.key == childs[j].key) {
              // console.log("item.key",item.key,childs[j].key)
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
          // {getMenus(item.child,siderFold,modules,selector,setting,ishidden, parentPath +item.key + '/',0)}

        }
      }

    })

//     return menuArray.map(element => 
//       { 
//        for(var i=0;i<modules.length;i++)
//        {
//          if ((element.key ==modules[i].name.toLowerCase())&&(modules[i].name.toLowerCase()=="user")|| element.key =="user_type"||element.key=="customer")
//         {
          
//         if (element.child) 
//         {

// // const getMenus = function (menuArray, siderFold, modules, parentPath) {
// //   // console.log(menuArray, "modarrayyyyyy");
// //   // console.log(modules, "module");
// //   parentPath = parentPath || '/'
// //   return menuArray.map(item => {

// //       for(var i=0;i<modules.length;i++)
// //       {
// //       if (item.key == modules[i].name.toLowerCase()) {

// //         if (item.child) {


//           return (
//             <Menu.SubMenu
//               key={element.key}
//               title={<span> {
//                 element.icon ? <Icon type={element.icon} /> : ''
//               }
//                 {
//                   siderFold && topMenus.indexOf(element.key) >= 0
//                     ? ''
//                     : element.name
//                 } </span>}>
//               {/* {console.log(item.key, "item")} */}
//               {getMenus(element.child, siderFold, modules,selector,setting,null, parentPath + element.key + '/',)}
//             </Menu.SubMenu>
//           )
//         } else {


//           return (
//             <Menu.Item key={element.key}>

//               <Link to={parentPath + element.key}>
//                 {element.icon
//                   ? <Icon type={element.icon} />
// //             <Menu.Item key={item.key}>
// //                  {/* {console.log(item.key, "item")} */}
// //               <Link to={parentPath + item.key}>
// //                 {item.icon
// //                   ? <Icon type={item.icon} />
//                   : ''}
//                 {siderFold && topMenus.indexOf(element.key) >= 0
//                   ? ''
//                   : element.name}
//               </Link>
//             </Menu.Item>
//           )
//         }
//       }

//       else if (element.key=="dashboard")
//       {
//         return (
//           <Menu.Item key={element.key}>
//             <Link to={parentPath + element.key}>
//               {element.icon
//                 ? <Icon type={element.icon} />
//                 : ''}
//               {siderFold && topMenus.indexOf(element.key) >= 0
//                 ? ''
//                 : element.name}
//             </Link>
//           </Menu.Item>
//          )
//         }
//       }
  
    
  
 }
}
    else if(ishidden)
    { 
      //  console.log("ishidden")
      return menuArray.map(item => 
    { 
      for(var i=0;i<modules.length;i++)
      { 
        if ((item.key == modules[i].name.toLowerCase()) && (item.key !== "user") && (item.key !=="user_type") && (item.key !== "customer")||(item.key=="dashboard") ) 

      {   
        if (item.child) 
        { childs.length=0;
          item.child.map((item)=>{
             childs.push(item);
            })
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
              {getMenus(item.child,siderFold,modules,selector,setting,ishidden, parentPath +item.key + '/')}
            </Menu.SubMenu>
          )

        } else{
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
      else  {
        for(var j=0; j<childs.length;j++)
        {  if(item.key==childs[j].key)
          {
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
      // {getMenus(item.child,siderFold,modules,selector,setting,ishidden, parentPath +item.key + '/',0)}

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
  ishidden,
  changeOpenKeys,
  modules
}) {

 
  var menuItems = getMenus(menu, siderFold, modules,selector,setting,ishidden);
  const onOpenChange = (openKeys)=>{

  // console.log(getMenus(menu, siderFold, modules), "func");
  // console.log(modules,"func");
//   var menuItems = getMenus(menu, siderFold, modules)
//   // console.log(menuItems, "menues");
//   const onOpenChange = (openKeys) => {
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
