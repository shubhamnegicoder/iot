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
import {CLIENT_ID} from '../../CommonMethods/api'

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
  regionDropDown,
  zoneDropDown,
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
      ? 'Add New Branch'
      : 'Edit User'}`,
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
              initialValue: item._id,
            })(<Input/>)}
          </FormItem>
          <FormItem style={displayNone} label='clientId' hasFeedback {...formItemLayout}>
            {getFieldDecorator('clientId', {
              initialValue: CLIENT_ID,
            })(<Input/>)}
          </FormItem>
          <FormItem label='Region' hasFeedback {...formItemLayout}>
             {getFieldDecorator('regionId', {
               initialValue: item.regionId,
               rules: [
                   {
                       required: true,
                       message: 'Please select Region'
                   }
               ]
             })(<Select  placeholder="Select Region" >
                 {
                  regionDropDown.map((item,index)=>{
                  return <Select.Option value={item.regionId} key = {index} >{item.regionName}</Select.Option>
                })}
                </Select>
             )}
          </FormItem>
          <FormItem label='Zone' hasFeedback {...formItemLayout}>
             {getFieldDecorator('zoneId', {
               initialValue: item.zoneId,
               rules: [
                   {
                       required: true,
                       message: 'Please select Zone'
                   }
               ]
             })(<Select  placeholder="Select Zone" >
                 {
                  zoneDropDown.map((item,index)=>{
                  return <Select.Option value={item.zoneId} key = {index} >{item.zoneName}</Select.Option>
                })}
                </Select>
             )}
          </FormItem>
          <FormItem label='Branch Name：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('branchName', {
              initialValue: item.branchName,
              rules: [
                {
                  required: true,
                  message: 'Branch Name Can not be Empty'
                }
              ]
            })(<Input placeholder="Branch Name" />)}
          </FormItem>
          <FormItem label='Address：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('Address', {
              initialValue: item.Address,
              rules: [
                {
                  required: true,
                  message: 'Address Cannot be Empty'
                }
              ]
            })(<Input placeholder="Address" />)}
          </FormItem>
          <FormItem label='Pin Code:' hasFeedback {...formItemLayout}>
            {getFieldDecorator('pinCode', {
              initialValue: item.pinCode,
              rules: [
                {
                  required: true,
                  message: 'Pin Code Cannot be Empty'
                }
              ]
            })(<Input placeholder="Pin Code" />)}
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
                  <Option value="ACTIVE" >Active</Option>
                  <Option value="INACTIVE" >Inactive</Option>
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
