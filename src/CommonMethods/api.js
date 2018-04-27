import superagent from 'superagent';

// console.log(socket,"obkjkjks")



// const socket = io.connect(process.env.SOCKET_URL);
// socket.on('message', msg => console.log(msg));
// // var socket2 = io.connect();
// console.log('check 1', socket2.connected);
// socket2.on('connect', function() {
//   console.log('check 2', socket2.connected);
// });

// 
const apiFunc = {};
const BASE_URL = 'http://139.59.95.113:8080';
const CLIENT_ID = localStorage.getItem("customerId");
const id = localStorage.getItem("_id");
apiFunc.getAssetTypeList = () => {
  const id = localStorage.getItem("_id");
  return superagent
    .get(BASE_URL + '/allAssetType')
    .query({ _id: id })
}
apiFunc.getCustomerList = () => {
  const id=localStorage.getItem("_id");
  return superagent
    .get(BASE_URL + '/allCustomer')
    .query({ _id: id })
}
apiFunc.getRegionList = () => {
  return superagent
    .get(BASE_URL + '/allRegion')
    .query({ clientId: 131 })
}
apiFunc.getZoneList = () => {
  return superagent
    .get(BASE_URL + '/allZone')
    .query({ clientId: 131 })
}
apiFunc.getBranchList = () => {
  return superagent
    .get(BASE_URL + '/allBranch')
    .query({ clientId: 131 })
}
apiFunc.getUserTypeList = () => {
  const id = localStorage.getItem("_id");
  return superagent
    .get(BASE_URL + '/allRole')
    .query({ _id: id })
}
apiFunc.getAsset = () => {
  const CLIENT_ID = localStorage.getItem("customerId");
  const id = localStorage.getItem("_id");
  return superagent
    .get(BASE_URL + '/getallAsset')
    .query({ customerId: CLIENT_ID, _id: id })
}
apiFunc.module = (username, password) => {
  return superagent
    .get(BASE_URL + '/login')
    .query({ emailId: username }, { password: password })
}

  
  
  





export default {
  apiFunc,
  BASE_URL,
  CLIENT_ID
};
