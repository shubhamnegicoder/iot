import React, {PropTypes} from 'react'
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Modal,
  Select,
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
      ? 'Add New Region'
      : 'Edit Region'}`,
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
          <FormItem label='Region Name：' hasFeedback {...formItemLayout}>
            {getFieldDecorator('regionName', {
              initialValue: item.regionName,
              rules: [
                {
                  required: true,
                  message: 'region name Cannot be Filled'
                }
              ]
            })(<Input placeholder="Region Name"/>)}
          </FormItem>
          <FormItem label='Status' hasFeedback {...formItemLayout}>
            {getFieldDecorator('status', {
              initialValue: item.status,
              rules: [
                {
                  required: true,
                  message: 'status'
                }
              ]
            })(<Select placeholder="Select Status" >
                 <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">InActive</Select.Option>
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
