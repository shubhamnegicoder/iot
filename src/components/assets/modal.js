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
  id,
  customerId,
  visible,
  type,
  item = {},
  dropDownData,
  branchDropDown,
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
      ? 'Create New Asset'
      : 'Edit Asset'}`,
    visible,
    id,
    customerId,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  }

  return (
    <LocaleProvider locale={enUS}>
      <Modal {...modalOpts}>
        <Form layout>
          <FormItem  label='_id' hasFeedback {...formItemLayout}>
            {getFieldDecorator('_id', {
              initialValue: id,
            })(<Input/>)}
          </FormItem>
          <FormItem  label='customerId' hasFeedback {...formItemLayout}>
            {getFieldDecorator('customerId', {
              initialValue: customerId,
            })(<Input/>)}
          </FormItem>
          <FormItem label='Serial No.' hasFeedback {...formItemLayout}>
            {getFieldDecorator('serialNo', {
              initialValue: item.serialNo,
              rules: [
                {
                  required: true,
                  message: 'Serial no. is required'
                }
              ]
            })(<Input placeholder="Serial No." />)}
          </FormItem>
          <FormItem label='Asset Type' hasFeedback {...formItemLayout}>
             {getFieldDecorator('assetTypeId', {
               initialValue: item.assetTypeID,
               rules: [
                   {
                       required: true,
                       message: 'Please select Asset Type!'
                   }
               ]
             })(<Select  placeholder="Select Asset Type" >
                 {
              dropDownData  && dropDownData.map((item,index)=>{
                  return <Select.Option value={item._id} key = {index} >{item.assetTypeName}</Select.Option>
                })}
                </Select>
             )}
          </FormItem>
          <FormItem label='Asset Name' hasFeedback {...formItemLayout}>
            {getFieldDecorator('assetName', {
              initialValue: item.assetTypeName,
              rules: [
                {
                  required: true,
                  message: 'Asset name is required'
                }
              ]
            })(<Input placeholder="Asset Name" />)}
          </FormItem>
          {/* <FormItem label='Branch Name' {...formItemLayout}>
             {getFieldDecorator('branchId', {
               initialValue: item.branchId,
               rules: [
                   {
                       required: true,
                       message: 'Please select Branch!'
                   }
               ]
             })(<Select  placeholder="Select Branch" >
                   {
                    branchDropDown.map((item,index)=>{
                    return <Select.Option value={item.branchId} key = {index} >{item.branchName}</Select.Option>
                  })}
                </Select>
             )}
          </FormItem> */}
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
