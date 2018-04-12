import React, {PropTypes} from 'react'
import {
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
  Modal,
  LocaleProvider
} from 'antd'
import enUS from 'antd/lib/locale-provider/en_US';

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
const displayNone = {
  display: "none"
}
const modal = ({
  visible,
  type,
  item = {},
  dropDownData,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${type === 'create'
      ? 'Add New User'
      : 'Edit Asset'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  }

  return (
    <LocaleProvider locale={enUS}>
      <Modal {...modalOpts}>
        <Form horizontal>
          <FormItem style={displayNone} label='_id' hasFeedback {...formItemLayout}>
            {getFieldDecorator('_id', {
              initialValue:(localStorage.getItem("_id")),
            })(<Input/>)}
          </FormItem>
          <FormItem style={displayNone} label='clientId' hasFeedback {...formItemLayout}>
            {getFieldDecorator('clientId', {
              initialValue: 131,
            })(<Input/>)}
          </FormItem>
          <FormItem label='Email Id' hasFeedback {...formItemLayout}>
            {getFieldDecorator('emailId', {
              initialValue: item.emailId,
              rules: [
                {
                  required: true,
                  message: 'Email Id is required'
                }
              ]
            })(type==="update"?<Input disabled={true}/>:<Input placeholder="Enter Email"/>)}
          </FormItem>
          <FormItem label='Password' hasFeedback {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  required: true,
                  message: 'Password is required'
                }
              ]
            })(type==="update"?<Input disabled={true}/>:<Input placeholder="Enter Password"/>)}
          </FormItem>
          <FormItem label='User Name' hasFeedback {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                  message: 'User Name is required'
                }
              ]
            })(type === "update" ? <Input disabled={true} /> : <Input placeholder="Enter User Name" />)}
          </FormItem>
          <FormItem label='Role' hasFeedback {...formItemLayout}>
             {getFieldDecorator('roleId', {
               initialValue: item.roleId,
               rules: [
                   {
                       required: true,
                       message: 'role id is required'
                   }
               ]
             })(type==="update"?<Select placeholder="Select  Role" disabled ={true}>
                {
                  dropDownData.map((item, index) => {
                    return <Select.Option value={item.roleId} key={item._id}>
                        {item.role}
                      </Select.Option>
                  })
                }
             </Select> : <Select placeholder="Select Role" >
                 {
                   dropDownData.map((item, index) => {
                     return <Select.Option value={item.roleId} key={item._id}>
                       {item.role}
                     </Select.Option>
                   })
                 }
               </Select>
             )}
          </FormItem>
         
          <FormItem label='Address' hasFeedback {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: item.address,
              rules: [
                {
                  required: true,
                  message: 'Address is required'
                }
              ]
            })(type === "update" ? <Input disabled={true} /> : <Input placeholder="Enter Address" />)}
          </FormItem>
          <FormItem label='city' hasFeedback {...formItemLayout}>
            {getFieldDecorator('city', {
              initialValue: item.city,
              rules: [
                {
                  required: true,
                  message: 'city is required'
                }
              ]
            })(type === "update" ? <Input disabled={true} /> : <Input placeholder="Enter city" />)}
          </FormItem>
          <FormItem label='state' hasFeedback {...formItemLayout}>
            {getFieldDecorator('state', {
              initialValue: item.state,
              rules: [
                {
                  required: true,
                  message: 'state is required'
                }
              ]
            })(type === "update" ? <Input disabled={true} /> : <Input placeholder="Enter state" />)}
          </FormItem>
          <FormItem label='country' hasFeedback {...formItemLayout}>
            {getFieldDecorator('country', {
              initialValue: item.country,
              rules: [
                {
                  required: true,
                  message: 'country is required'
                }
              ]
            })(type === "update" ? <Input disabled={true} /> : <Input placeholder="Enter country" />)}
          </FormItem>
          
          <FormItem label="Status" {...formItemLayout}>
             {getFieldDecorator('status', {
               initialValue: item.status,
               rules: [
                   {
                       required: true,
                       message: 'Please select status!'
                   }
               ]
             })(<Select  placeholder="Select Status" >
                  <Select.Option value="ACTIVE" >Active</Select.Option>
                  <Select.Option value="INACTIVE" >Inactive</Select.Option>
                </Select>
             )}
          </FormItem>
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

export default Form.create()(modal)
