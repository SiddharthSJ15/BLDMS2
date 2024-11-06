import React, { useEffect, useState } from 'react'
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'
function HospitalLogin() {
    const [loginData, setloginData] = useState({
        email: '',
        password: ''
    });

    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        setloginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    const submitForm = () => {
        const loginFormData = new FormData();
        loginFormData.append('email', loginData.email)
        loginFormData.append('password', loginData.password)
        try {
            axios.post(baseUrl + '/hospital-login/', loginFormData).then((res) => {
                    if (res.data.bool === true) {
                        localStorage.setItem('hospitalLoginStatus', true)
                        localStorage.setItem('hospitalId', res.data.hospital_id)
                        window.location.href='/hospital-home';
                    } else {
                        setErrorMsg('Invalid Email or Password')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    const hospitalLoginStatus = localStorage.getItem('hospitalLoginStatus')
    if (hospitalLoginStatus === 'true') {
        window.location.href = '/hospital-home'
    }
    useEffect(() => {
        document.title = 'Login'
    })

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card'>
                        <h3 className='card-header'>Hospital Login </h3>
                        <div className='card-body'>
                        {/* <form onSubmit={submitForm}> */}
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="text" name="email" value={loginData.email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" name="password" value={loginData.password} onChange={handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary mt-3">Submit</button>
                        {/* </form> */}
                    </div>
                    {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                </div>
            </div>
        </div>
        </div>
    )
}

export default HospitalLogin;
