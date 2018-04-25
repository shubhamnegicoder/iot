import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/customer/list'
import UserSearch from '../components/customer/search'
import UserModal from '../components/customer/modal'
import { Row, Col } from 'antd';

function Customer({ location, dispatch, customer }) {
    const {
        id,
        loading,
        list,
        pagination,
        currentItem,
        modalVisible,
        modalType
    } = customer
    const { field, keyword } = location.query

    const userModalProps = {
        id,
        item: modalType === 'create'
            ? {}
            : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({ type: `customer/${modalType}`, payload: data })
        },
        onCancel() {
            dispatch({ type: 'customer/hideModal' })
        }
    }
    const userListProps = {
        dataSource: list,
        loading,
        pagination: pagination,
        onPageChange(page) {
            const { query, pathname } = location
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
            dispatch({ type: 'customer/delete', payload: id })
        },
        onEditItem(item) {
            dispatch({
                type: 'customer/showModal',
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
                    pathname: 'customer',
                    query: {
                        field: fieldsValue.field,
                        keyword: fieldsValue.keyword
                    }
                }))
                : dispatch(routerRedux.push({ pathname: 'customer' }))
        },
        onAdd() {
            dispatch({
                type: 'customer/showModal',
                payload: {
                    modalType: 'create'
                }
            })
        }
    }

    const UserModalGen = () => <UserModal {...userModalProps} />
    return (
        <div className='content-inner'>
            <Row>
                <Col xs={24} md={24} lg={24}>
                    <UserSearch {...userSearchProps} />
                    <UserList {...userListProps} />
                    <UserModalGen />
                </Col>

            </Row>

        </div>
    )

}
Customer.propTypes = {
    customer: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func
}

function mapStateToProps({ customer }) {
    return { customer }
}

export default connect(mapStateToProps)(Customer)