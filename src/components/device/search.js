import React, { PropTypes } from 'react'
import { Form, Button, Row, Col } from 'antd'
import SearchGroup from '../ui/search'
var a=false;
const search = ({
  field,
  keyword,
  onSearch,
  onAdd,
  modules,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [{ value: 'name', name: 'Name' }],
    selectProps: {
      defaultValue: field || 'name'
    },
    onSearch: (value) => {
      onSearch(value)
    }
  }
 
   var permission= modules[1].permission[1];
   if(permission=="POST"){
    a=true;
   }
   console.log(a,"kkkkk")
  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
        <SearchGroup {...searchGroupProps} />
      </Col>
      <Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24} style={{marginBottom: 16, textAlign: 'right'}}>
        {a?<Button size='large' type='ghost' onClick={onAdd}>Add Device</Button>:<div></div>}
      </Col>
    </Row>
  )
}

search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
}

export default Form.create()(search)
