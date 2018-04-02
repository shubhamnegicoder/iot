import React, {PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import UserList from '../../components/device/list'
import UserSearch from '../../components/device/search'
import UserModal from '../../components/device/modal'
import {apiFunc} from "../../CommonMethods/api"
import {Row, Col} from 'antd';

function Device({location, dispatch, device}) {
  const {
    loading,
    list,
    pagination,
    currentItem,
    modalVisible,
    dropdown,
    modalType
  } = device
  async function getallasset() {
    var a= await apiFunc.getAsset();
    device.dropdown=a.body.data;
  }
getallasset();
  const {field, keyword} = location.query

  const userModalProps = {
    item: modalType === 'create'
      ? {}
      : currentItem,
    type: modalType,
    dropdown:dropdown,
    visible: modalVisible,
    onOk(data) {
      dispatch({type: `device/${modalType}`, payload: data})
    },
    onCancel() {
      dispatch({type: 'device/hideModal'})
    }
  }

  const userListProps = {
    dataSource: list,
    loading,
    pagination: pagination,
    onPageChange(page) {
      const {query, pathname} = location
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }))
    },
    onDeleteItem(id) {
      dispatch({type: 'device/delete', payload: id})
    },
    onEditItem(item) {
      dispatch({
        type: 'device/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }

  const userSearchProps = {
    field,
    keyword,
    onSearch(fieldsValue) {
      fieldsValue.keyword.length
        ? dispatch(routerRedux.push({
          pathname: '/device',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword
          }
        }))
        : dispatch(routerRedux.push({pathname: '/device'}))
    },
    onAdd() {
      dispatch({
        type: 'device/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  const UserModalGen = () => <UserModal {...userModalProps}/>


  return (
    <div className='content-inner'>
      <Row>
        <Col xs={24} md={24} lg={24}>
          <UserSearch {...userSearchProps}/>
          <UserList {...userListProps}/>
          <UserModalGen/>
        </Col>

      </Row>

    </div>
  )
}

Device.propTypes = {
  device: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({device}) {
  return {device}
}

export default connect(mapStateToProps)(Device)
