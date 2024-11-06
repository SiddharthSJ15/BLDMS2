function Logout() {
  const hospitalLoginStatus = localStorage.getItem('hospitalLoginStatus');
  const userLoginStatus = localStorage.getItem('userLoginStatus');
  if(userLoginStatus !== null)
  {
    localStorage.removeItem('userLoginStatus')
    window.location.href='/'
  }
  if(hospitalLoginStatus !== null)
  {  
    localStorage.removeItem('hospitalLoginStatus')
    window.location.href='/hospital-login'
  }
  
  return (
      <div>
      </div>
  );
  
}

export default Logout;