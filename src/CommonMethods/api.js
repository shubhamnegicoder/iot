import superagent from 'superagent';

const apiFunc = {};
const BASE_URL = 'http://139.59.95.113:8080';
const CLIENT_ID = localStorage.getItem("customerId");
const id=localStorage.getItem("_id");
console.log(id ,CLIENT_ID ,"_id aa rhi for customer function")
apiFunc.getAssetTypeList = () => {
     return superagent
       .get(BASE_URL+'/allAssetType')
       .query({_id:"5abb405db702f85ac7706c0e"})
}
apiFunc.getCustomerList = () => {
  return superagent
    .get(BASE_URL+'/allCustomer')
    .query({_id:"5abb405db702f85ac7706c0e"})
}
apiFunc.getRegionList = () =>{
    // console.log("aa gaya mai 123")
       return superagent
         .get(BASE_URL+'/allRegion')
         .query({clientId: 131})
}
apiFunc.getZoneList = () =>{
    return superagent
         .get(BASE_URL+'/allZone')
         .query({clientId: 131})
}
apiFunc.getBranchList = () =>{
    return superagent
         .get(BASE_URL+'/allBranch')
         .query({clientId: 131})
}
apiFunc.getUserTypeList = () => {
     return superagent
       .get(BASE_URL+'/allUserType')
       .query({clientId: 131})
}
apiFunc.getAsset=()=>{
  const CLIENT_ID = localStorage.getItem("customerId");
  const  id=localStorage.getItem("_id");
  console.log(id ,CLIENT_ID ,"_id aa rhi for customer function")
  return superagent
  .get(BASE_URL+'/allAsset')
  .query({customerId:CLIENT_ID,_id:id})
}
apiFunc.module=(username,password)=>{
  return superagent
    .get(BASE_URL+'/login')
  .query({emailId:username},{password:password})
}

export default {
  apiFunc,
  BASE_URL,
  CLIENT_ID
};
