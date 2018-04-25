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
import {CLIENT_ID} from '../../CommonMethods/api';
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
  id,
  customerId,
  visible,
  type,
  item = {},
  onOk,
  dropdown,
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
    id,
    customerId,
    title: `${type === 'create'
      ? 'Add New Device'
      : 'Edit Device'}`,
    visible,
    onOk:handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  }

  return ( 
    <LocaleProvider locale={enUS}>
    
      <Modal {...modalOpts}>
        <Form horizontal>
          <FormItem style={displayNone} label='_id' hasFeedback {...formItemLayout}>
            {getFieldDecorator('_id', {
              initialValue:id,
            })(<Input/>)}
          </FormItem>
          <FormItem  style={displayNone} label='customertId' hasFeedback {...formItemLayout}>
            {getFieldDecorator('customerId', {
              initialValue: customerId,
            })(<Input />)}
          </FormItem>

           <FormItem label='Device Id' hasFeedback {...formItemLayout}>
            {getFieldDecorator('deviceId', {
              initialValue: item.deviceId,
              rules: [
                {
                  required: true,
                  message: 'Device Id is required'
                }
              ]
            })((type === "update" ? <Input readOnly={true} placeholder="Device Id" /> : <Input placeholder="Device Id" />))}
          </FormItem>
          <FormItem label='Device Name' hasFeedback {...formItemLayout}>
            {getFieldDecorator('deviceName', {
              initialValue: item.deviceName,
              rules: [
                {
                  required: true,
                  message: 'Device Name is required'
                }
              ]
            })((type === "update" ? <Input readOnly={true} placeholder="Device Name" /> : <Input placeholder="Device Name" />))}
          </FormItem>

          <FormItem  label='Serial No.' hasFeedback {...formItemLayout}>
            {getFieldDecorator('serialNo', {
              initialValue: item.serialNo,
              rules: [
                {
                  required: true,
                  message: 'Serial no. is required'
                }
              ]
            })(type === "update" ? <Input readOnly={true} placeholder="Serial No" /> : <Input placeholder="Serial No" type="number" />)}
          </FormItem>
          <FormItem label='Sim No.' hasFeedback {...formItemLayout}>
            {getFieldDecorator('simno', {
              initialValue: item.simno,
              rules: [
                {
                  required: true,
                  message: 'Sim no. is required'
                }
              ]
            })(type === "update" ? <Input readOnly={true} placeholder="Sim No" /> : <Input placeholder="Sim No" type="number" />)}
          </FormItem>
          <FormItem label='Asset Id' hasFeedback {...formItemLayout}>
             {getFieldDecorator('assetId', {
               initialValue: item.assetId,
               rules: [
                   {
                       required: true,
                       message: 'Please select Asset Name!'
                   }
               ]
            })(type==="update" ?<Select placeholder="Select Asset" disabled={true} >
              {
                dropdown && dropdown.map((item, index) => {
                  return <Select.Option value={item.assetId} key={index} >{item.assetName}</Select.Option>
                })}
            </Select>:<Select placeholder="Select Asset" >
                {
                 dropdown && dropdown.map((item, index) => {
                    return <Select.Option value={item._id} key={index} >{item.assetName}</Select.Option>
                  })}
              </Select>
             )}
          </FormItem>
         
          <FormItem label='Device Type' hasFeedback {...formItemLayout}>
            {getFieldDecorator('deviceType', {
              initialValue: item.deviceType,
              rules: [
                {
                  required: true,
                  message: 'Device Type  is required'
                }
              ]
            })((type === "update" ? <Input readOnly={true} placeholder="Device Type" /> : <Input placeholder="Device Type" />))}
          </FormItem>
          <FormItem label='Brand' hasFeedback {...formItemLayout}>
            {getFieldDecorator('brand', {
              initialValue: item.brand,
              rules: [
                {
                  required: true,
                  message: 'Brand name  is required'
                }
              ]
            })((type === "update" ? <Input readOnly={true} placeholder="Brand Name" /> : <Input placeholder="Branch Name" />))}
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
