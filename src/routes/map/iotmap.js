import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import {BASE_URL, CLIENT_ID} from '../../CommonMethods/api';
import openSocket from 'socket.io-client';
// import io from 'socket.io-client';


var customerId;
const style = {
  width: '100%',
  height: '100%'
}
const mapCenter = {
  lat: 28.59674855,
  lng: 77.32826332
}

export default class IotMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      allDeviceData: [],
      alert:String
      
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }
  componentDidMount(){
    const socket = openSocket('http://139.59.95.113:8081');
    
    socket.on('5ad83ff0b443435298741d3b000012345678901',(data)=>{
      console.log(data,"aayega ki nhi")
      this.setState({alert:data.type})
     
    });
    }
  componentWillReceiveProps(nextprops) {
    superagent
    .get(BASE_URL+"/allDeviceRecentData?customerId="+nextprops.id)
    .end((err, response) => {
      if (response !== undefined) {
        this.setState({allDeviceData:response.body.data})
      }
    })

  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  render() {
  customerId=this.props.id;
    const {
      lat,
      lng
    } = this.state.allDeviceData && this.state.allDeviceData[0] || mapCenter
    return (
      <Map google={window.google}
          zoom={15}
          initialCenter={{
            lat: lat,
            lng: lng }}
          onClick={this.onMapClicked}>

          {  
            this.state.allDeviceData && this.state.allDeviceData.map((device, index) => {
            return <Marker key={index} onClick={this.onMarkerClick}
              deviceType={device.deviceType}
              status={device.status}
              temp={device.temprature}
              deviceId={device.deviceId}
              position={{lat: device.recent.latitude, lng: device.recent.longitude}}
              // icon={{
              //   url: "assets/"+device.deviceType+".png"
              // }} 
              />
          })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h5>{this.state.selectedPlace.deviceType}</h5>
              <div>Status: {this.state.selectedPlace.status}</div>
              <div>Temprature: {this.state.selectedPlace.temp}</div>
              <div>
                <a target="_blank" href={`#/devicemap?id=${this.state.selectedPlace.deviceId}`}>click</a>
              </div>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

IotMap.propTypes ={
  all_device_api: PropTypes.string
}

IotMap.defaultProps = {
  all_device_api: BASE_URL+"/allDeviceRecentData?customerId="+customerId
}
// google api loads manually if no api script in application
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCfPJonsREY-XuLLfLPSlYjfihOhkmbaE0'
// })(IotMap)
