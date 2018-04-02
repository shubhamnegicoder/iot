import React, {PropTypes} from 'react'
import {connect} from 'dva'
import DeviceHistoryMap from './devicehistorymap'

function DeviceMap({devicemap, dispatch}) {
  const {
    deviceHistory
  } = devicemap
  // history array is for demo path if no data available
  const history = [
    {lat: 28.59663335, lng: 77.32828849},
    {lat: 28.5867417, lng: 77.30819544}
  ]

  return (
    <div>
      <DeviceHistoryMap deviceHistory={history}/>
    </div>
  )
}

DeviceMap.propTypes = {
  deviceHistory: PropTypes.array
}

export default connect(({devicemap}) => ({devicemap}))(DeviceMap)
