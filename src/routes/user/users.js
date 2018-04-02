import React, {PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import UserList from '../../components/user/list'
import UserSearch from '../../components/user/search'
import UserModal from '../../components/user/modal'
import {apiFunc} from '../../CommonMethods/api'
import {Row, Col} from 'antd';

function Users({location, dispatch, users}) {
  const {
    loading,
    dropDownData,
    list,
    pagination,
    currentItem,
    modalVisible,
    modalType
  } = users
  const {field, keyword} = location.query

  async function  userType(){
    var a = await apiFunc.getUserTypeList()
    users.dropDownData = a.body.data;
  }
  userType();

  const userModalProps = {
    item: modalType === 'create'
      ? {}
      : currentItem,
    type: modalType,
    dropDownData: dropDownData,
    visible: modalVisible,
    onOk(data) {
      dispatch({type: `users/${modalType}`, payload: data})
    },
    onCancel() {
      dispatch({type: 'users/hideModal'})
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
      dispatch({type: 'users/delete', payload: id})
    },
    onEditItem(item) {
      dispatch({
        type: 'users/showModal',
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
          pathname: '/user/users',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword
          }
        }))
        : dispatch(routerRedux.push({pathname: '/user/users'}))
    },
    onAdd() {
      dispatch({
        type: 'users/showModal',
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

Users.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({users}) {
  return {users}
}

export default connect(mapStateToProps)(Users)
