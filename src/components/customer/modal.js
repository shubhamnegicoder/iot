import React, {PropTypes} from 'react'
import {CLIENT_ID} from '../../CommonMethods/api'
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
  id,
  type,
  item = {},
  onOk,
  notify,
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
       
      }
      
      onOk(data,notify)
    })
  }
  
  
  const modalOpts = {
    title: `${type === 'create'
      ? 'Create New Customer'
      : 'Edit Asset Type'}`,
    visible,
    onOk:handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal'
  }

  return (
    <LocaleProvider locale={enUS}>
      <Modal {...modalOpts}>
        <Form horizontal>
          <FormItem   label='_id' hasFeedback {...formItemLayout}>
            {getFieldDecorator('_id', {
              initialValue:id,
            })(<Input/>)}
          </FormItem>
          {/* <FormItem style={displayNone} label='clientId' hasFeedback {...formItemLayout}>
            {getFieldDecorator('clientId', {
              initialValue: CLIENT_ID,
            })(<Input/>)}
          </FormItem> */}
          <FormItem label='Customer Name' hasFeedback {...formItemLayout}>
            {getFieldDecorator('customerName', {
              initialValue:item.customerName,
              rules: [
                {
                  required: true,
                  message: 'customer Name is required'
                }
              ]
            })(<Input placeholder="customer Name"/>)}
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