import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import {BASE_URL, CLIENT_ID} from '../../CommonMethods/api';

const mapCenter = {
  lat: 28.59674855,
  lng: 78.52826332
}
var map = {}
const mapStyle = {
  position: "absolute",
  width: "100%",
  height: "100%"
}

export default class DeviceHistoryMap extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

    const {
      lat,
      lng
    } = this.props.deviceHistory[0] || mapCenter

    map = new google.maps.Map(this.refs.historymap, {
      center: {lat: lat, lng: lng},
      zoom: 12
    });
    this.setDeviceMap()
  }
  calculateAndDisplayRoute = (directionsService, directionsDisplay,myloc) => {
    let selectedMode = "DRIVING";//document.getElementById('mode').value;
    directionsService.route({
      origin: {lat: myloc[0].lat, lng: myloc[0].lng},  // Haight.
      destination: {lat: myloc[(myloc.length-1)].lat, lng: myloc[(myloc.length-1)].lng},  // Ocean Beach.
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  initMap = (historyData) => {
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let directionsService = new google.maps.DirectionsService;
    // let dmap = new google.maps.Map(document.getElementById('dmap'), {
    //   zoom: 14,
    //   center: {lat: historyData[0].lat, lng: historyData[0].lng}
    // });
    directionsDisplay.setMap(map);
    this.calculateAndDisplayRoute(directionsService,directionsDisplay,historyData);
    return <div>Data Exist</div>
  }
  setDeviceMap = () => {
    let historyData = this.props.deviceHistory.map((item, index) => {
      return {lat: item.lat, lng: item.lng}
    })
    if (this.props.deviceHistory.length) {
      return this.initMap(historyData)
    }
    else return <div>no path history</div>
  }

  render() {
    const {
      lat,
      lng
    } = mapCenter

    return (
      <div>
        <div id="dmap" style={mapStyle} ref="historymap"></div>
      </div>
    )
  }
}
