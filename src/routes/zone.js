import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../components/zone/list'
import UserSearch from '../components/zone/search'
import UserModal from '../components/zone/modal'
import {apiFunc} from '../CommonMethods/api'
import { Row, Col } from 'antd';

function Zone({ location, dispatch, zone }) {
    const {
    loading,
    dropDownData,
        list,
        pagination,
        currentItem,
        modalVisible,
        modalType
  } = zone
    const { field, keyword } = location.query
    async function getRegion(){
        var a = await apiFunc.getRegionList()
        zone.dropDownData = a.body.data;
    }
    getRegion();
    const userModalProps = {
        item: modalType === 'create'
            ? {}
            : currentItem,
        type: modalType,
        dropDownData: dropDownData,
        visible: modalVisible,
        onOk(data) {
            dispatch({ type: `zone/${modalType}`, payload: data })
        },
        onCancel() {
            dispatch({ type: 'zone/hideModal' })
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
            dispatch({ type: 'zone/delete', payload: id })
        },
        onEditItem(item) {
            dispatch({
                type: 'zone/showModal',
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
                    pathname: 'zone',
                    query: {
                        field: fieldsValue.field,
                        keyword: fieldsValue.keyword
                    }
                }))
                : dispatch(routerRedux.push({ pathname: 'zone' }))
        },
        onAdd() {
            dispatch({
                type: 'zone/showModal',
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

Zone.propTypes = {
    zone: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func
}

function mapStateToProps({ zone }) {
    return { zone }
}

export default connect(mapStateToProps)(Zone)
