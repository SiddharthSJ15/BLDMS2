import axios from 'axios'
import React, { useEffect, useState } from 'react'
const baseUrl = 'http://127.0.0.1:8000/api';

function UserHome() {
  const [bloodData, setBloodData] = useState([])
  const userId = localStorage.getItem('userId');
  console.log(userId)

  useEffect(() => {
    try {
      axios.get(baseUrl + '/blood-request/' + userId)
        .then((res) => {
          setBloodData(res.data.results)
          console.log(res.data)
        })
    } catch (error) {

    }
  }, [userId])

  return (
    <div className='container mt-4'>
      <h1 className='text-uppercase fw-bold'>Pending Requests</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">

        {bloodData.map((rows, index) =>
          rows.units > 0 ? (
            <div className="col">
              <div className="card text-bg-danger h-100">
                <div className="card-body">
                  <h4 className="card-title">Name: {rows.user}</h4>
                  <p>Blood Group: {rows.blood.name}</p>
                  <p>Date required: {rows.required_on}</p>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>

      <h1 className='text-uppercase fw-bold'>Completed</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {bloodData.map((rows, index) =>
          rows.units > 2 ? (
            <div className="col">
              <div className="card text-bg-secondary h-100">
                <div className="card-body">
                  <h4 className="card-title">Name: {rows.user}</h4>
                  <p>Blood Group: {rows.blood.name}</p>
                  <p>Date required: {rows.required_on}</p>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default UserHome;
