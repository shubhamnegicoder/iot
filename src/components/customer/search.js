import React, { PropTypes } from 'react'
import { Form, Button, Row, Col } from 'antd'
import SearchGroup from '../ui/search'
var g=false;
const modules=JSON.parse(localStorage.getItem("modules"))


const search = ({
  field,
  keyword,
  onSearch,
  onAdd,
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
    selectOptions: [{ value: 'name', name: 'Name' }, { value: 'address', name: 'Address' }],
    selectProps: {
      defaultValue: field || 'name'
    },
    onSearch: (value) => {
      onSearch(value)
    }
  }
  
 
   modules.forEach(function(value){
     if(value.name==="Customer"){
       value.permission.forEach(function(value){
         if(value=="POST"){
          g=true;
         }
       })
       
     }
   })

  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
        <SearchGroup {...searchGroupProps} />
      </Col>
      <Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24} style={{marginBottom: 16, textAlign: 'right'}}>
       {g?<Button size='large' type='ghost' onClick={onAdd}>Add Customer</Button>:<div></div>}
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
