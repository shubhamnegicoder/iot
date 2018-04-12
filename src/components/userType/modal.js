import React, {PropTypes} from 'react'
import {
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
  Modal,
  Row,
  Checkbox,
  checkboxGroup,
  LocaleProvider
} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US';

const FormItem = Form.Item

const formItemLayout={
  labelCol:{
    span:6
  },
  wrapperCol: {
    span:14
  }
}
const displayNone = {
  display: "none"
}
var obj = {}
var flag;
const modal = ({
  visible,
  modules,
  checked,
  type,
  item = {},
  onOk,
  onCancel,
  form:{
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue()
      }
      var formdata=[];
      var modules=[];
      var permission=[];
       for(var key in data )
       {  console.log([key],"key",data[key])
         if([key]="userType")
           {
         
             formdata.push({"role":data[key]})
           }
         if (([key] =="Asset" && data[key]==true) || ([key] == "Device" && data[key] == true) || ([key] == "User" && data[key] == true) || ([key] == "Customer"&& data[key] == true))
           {    console.log("heelo",[key])
             modules.push({"name":data[key]})
             if([key]=="Asset")
             {
                for(var key in data)
                {
                  if (([key] == "AGET" && data[key] ==true) || ([key] == "APUT" && data[key]==true) || ([key] == "ADELETE" && data[key] == true) || ([key] == "APOST" && data[key] == true))
                  {
                    console.log("suCSESS")
                  }
                }
             }
           }
          
        }
      onOk(data)
    })
   
  }
  const modalOpts ={
    title: `${type === 'create'
      ? 'Add User Type'
      : 'Edit Asset'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
 var handleCheck=(e,name)=>{
   flag=e.target.checked+name;
  }
 var checkbox=(name,label,bool,permission,optionclicked)=>{
   console.log("permission",permission,name);
   if(optionclicked==true)
   {
   return <FormItem 
   style={permission?{display: 'block'}:{display:'none'}} 
   className={bool?"col-xs-3":"col-xs-10"} 
   label={label}
    >
      {
        getFieldDecorator(name,
        {      
         })(<input type="checkbox" />)
      }
    </FormItem>
   }
   else{
     return <FormItem
       style={permission ? { display: 'block' } : { display: 'none' }}
       className={bool ? "col-xs-3" : "col-xs-10"}
       label={label}
     >
       {
         getFieldDecorator(name,
           {
           })(<input type="checkbox" onChange={(e) => { handleCheck(e, name) }} />)
       }
     </FormItem>
   }
  }

  return (
    <LocaleProvider locale={enUS}>
      <Modal {...modalOpts} style={{height:'400px',marginTop:'-150px'}}>
        <Form horizontal>
          {/* <FormItem style={displayNone} label='_id' hasFeedback {...formItemLayout}>
            {getFieldDecorator('_id', {
              initialValue: item._id,
            })(<Input/>)}
          </FormItem> */}
          {/* <FormItem style={displayNone} label='clientId' hasFeedback {...formItemLayout}>
            {getFieldDecorator('clientId', {
              initialValue: 131,
            })(<Input/>)}
          </FormItem> */}
          
          <FormItem label='User Type'>
            {getFieldDecorator('userType', {
              initialValue: item.userType,
              rules: [
                {
                  required: true,
                  message: 'User Type is required'
                }
              ]
            })(<Input/>)}
          </FormItem>
          <h6><b>Permissions:</b></h6>
             {
               modules.map((item)=> 
             {console.log("hello")
                var items=[];
              if(item.name=="Asset")
              {
                items.push(checkbox("Asset", "Asset",null,true))
                    item.permission.map((item) => {
                      console.log(item, "per");
                      if (item == "GET" || item == "POST" || item == "PUT" || item == "DELETE") 
                      {
                        if (flag ==true+"Asset")
                        {
                       
                         items.push(checkbox("A"+item, item,true,true,true))
                        }
                        else{
                          items.push(checkbox("A"+item, item,true))
                         }
                      }
                    })
                    return items ;
                }
              })
              }
              {
                    modules.map((item) => {
                      var items = [];
                      if (item.name == "Device") {
                        items.push(checkbox("Device", "Device",null, true))
                        item.permission.map((item) => {
                          console.log(item, "per");
                          if (item == "GET" || item == "POST" || item == "PUT" || item == "DELETE") {
                            console.log("if", item);
                            if (flag == true +"Device") {

                              items.push(checkbox("D"+item, item, true, true,true))
                            }
                            else {
                              items.push(checkbox("D"+item, item, true))
                            }
                           
                          }
                        })
                        return items;
                      }
                    })
      
              }
              {
              modules.map((item) => {
                var items=[];
                if (item.name == "Customer") {
                  items.push(checkbox("Customer", "Customer",null, true))
                  item.permission.map((item) => {
                    console.log(item, "per");
                    if (item == "GET" || item == "POST" || item == "PUT" || item == "DELETE") {
                      if (flag ==true+"Customer") {

                        items.push(checkbox("C"+ item, item, true, true,true))
                      }
                      else {
                        items.push(checkbox("C"+item, item, true))
                      }
                    }
                  })

                  return items;
                }
              })

              }
             {
              modules.map((item) =>{
                var items = [];
                if (item.name == "User") {
                  items.push(checkbox("User", "User",null, true))
                  item.permission.map((item) => {
                    console.log(item, "per");
                    if (item == "GET" || item == "POST" || item == "PUT" || item == "DELETE") {
                      
                      if (flag == true + "User") {

                        items.push(checkbox("U" + item, item, true, true,true))
                      }
                      else {
                        items.push(checkbox("U" + item, item, true))
                      }
                    }
                  })
                  return items;
                }
              })

             }
        </Form>
      </Modal>
    </LocaleProvider>
  )
}

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}
export default Form.create()(modal);