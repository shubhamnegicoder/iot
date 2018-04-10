import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Row, Col, Card} from 'antd'
import NumberCard from '../components/dashboard/numberCard'
import RecentSales from '../components/dashboard/recentSales'
import styles from './dashboard.less'
import {color} from '../utils'
import IotMap from './map/iotmap'

const bodyStyle = {
  bodyStyle: {
    minHeight: 510,
    background: '#fff'
  }
}
const cardStyle = {

   bodyStyle: {
    minHeight: 120,
    background: '#fff'
  }
}

function Dashboard({dashboard, dispatch,login}) {
  const {
    dashboardCard,
    recentSales_2,
    recentSales_3,
    numbers,
    id,
    ticket,
    customerId,
  } = dashboard

  
 if(dashboard.ticket==true ) 
 { dispatch({type:"dashboard/allUser",payload:{ticket:false}})
}

  const numberCards = dashboardCard.map((item, key) =>

    <Col key={key} lg={8} md={12}>
      <NumberCard {...item}/>
    </Col>)
    // dispatch({type:"dashboard/allUser"}))

  return (
    
    <div className="dashboard-2">
      <Row gutter={24}>
        {numberCards}
      </Row>
      <IotMap/>
    </div>
  )
}

Dashboard.propTypes = {
  numbers_2: PropTypes.array,
  recentSales_2: PropTypes.array,
  recentSales_3: PropTypes.array
}

export default connect(({dashboard}) => ({dashboard}))(Dashboard)
