import superagent from 'superagent';

const apiFunc = {};
const BASE_URL = 'http://139.59.95.113:8080';
const CLIENT_ID = 131;

apiFunc.getAssetTypeList = () => {
     return superagent
       .get(BASE_URL+'/allAssetType')
       .query({clientId: 131})
}
apiFunc.getRegionList = () =>{
    console.log("aa gaya mai 123")
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
  return superagent
  .get(BASE_URL+'/allAsset')
  .query({clientId:131})
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
