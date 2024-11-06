import React from 'react'
import Navigation from './Navigation'
import UserHome from './user/UserHome'
import HospitalHome from './hospital/HospitalHome'
import Logout from './Logout'
import UserLogin from './user/UserLogin'
import HospitalLogin from './hospital/HospitalLogin'
import {Routes, Route} from 'react-router-dom';
import BloodCollection from './hospital/BloodCollection'
import AddDonor from './hospital/AddDonor'
import Requests from './hospital/Requests'
import UserRequest from './user/UserRequest'
function Main() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navigation />
      <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path='/user-home' element={<UserHome />} />
        <Route path='/user-request' element={<UserRequest />} />

        <Route path='/hospital-home' element={<HospitalHome />} />
        <Route path='/hospital-login' element={<HospitalLogin />} />
        <Route path='/blood-collection' element={<BloodCollection />} />        
        <Route path='/add-donor' element={<AddDonor />} />
        <Route path='/hospital-requests' element={<Requests />} />
        
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </div>
  )
}   

export default Main
