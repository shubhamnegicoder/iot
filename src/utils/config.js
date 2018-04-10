module.exports = {
  name: 'Berr Admin 2.0',
  prefix: 'berrAdmin',
  footerText: 'IoT Admin All Rights Reserved 2018',
  logoSrc: 'assets/lamp.svg',
  logoText: 'IoT',
  // needLogin:true
  needLogin:()=>{
    if ((localStorage.getItem("username") == null) || (localStorage.getItem("username") ==undefined))
    {
      return true;
    }
    else
    { 
      return false;
    }
  }

}
