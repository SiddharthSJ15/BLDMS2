import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api';

function UserRequest() {
    const [donorData, setDonorData] = useState({
    user : '',
    blood : '',
    units : '',
    required_on : '',
    contact : '',
    age: ''
    })
    const userId = localStorage.getItem('userId');

    const [bloodData, setBloodData] =useState([])
    const [date, setDate] = useState(new Date());
    useEffect(()=>{
        try {
            axios.get(baseUrl+'/blood-group/')
            .then((res)=>{
                setBloodData(res.data.results)
                console.log(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    },[])
    console.log(date);
    const submitForm = () =>{
        const formattedDate = date.toISOString().split('T')[0];
        const donorFormData =  new FormData();
        donorFormData.append('created_by', userId)
        donorFormData.append('user', donorData.name);
        donorFormData.append('required_on', formattedDate);
        donorFormData.append('units', donorData.units);
        donorFormData.append('blood', donorData.blood);
        donorFormData.append('contact', donorData.contact);
        donorFormData.append('age',donorData.age)
        try {
            axios.post(baseUrl+'/blood-request/',donorFormData).then((res)=>{
                if(res.status===200 || res.status===201 ){
                    Swal.fire({
                        title: 'Request has been submitted',
                        icon: 'success',
                        timer:2000,
                        toast: true,
                        position: 'top-end',
                        timerProgressBar: true,
                        showConfirmButton: false,                                           
                    })
                      .then(function(){ 
                          window.location.href='/user-home'
                      });
                }
            });
        } catch (error) {

        }
    } 

    const handleChange = (event) => {
        setDonorData({
            ...donorData,
            [event.target.name]: event.target.value
        })
    }
    return (
        <div className='conatiner mt-5'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card text-bg-light'>
                        <div className='card-body'>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Full Name</label>
                                <input type="text" name="name" value={donorData.name} onChange={handleChange} className="form-control" placeholder="Enter name" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Contact No</label>
                                <input type="text" name="contact" value={donorData.contact} onChange={handleChange} className="form-control" placeholder="Enter contact number" />
                            </div>                            
                            <div className="form-group">
                                <label for="exampleInputEmail1">Age</label>
                                <input type="text" name="age" value={donorData.age} onChange={handleChange} className="form-control" placeholder="Donor age" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Blood Group</label>
                                <select name='blood' onChange={handleChange} className='form-select'>
                                    <option selected>Select Blood Group</option>
                                            {
                                                bloodData.map((opts,index)=> {return <option key={index} value={opts.id}>{opts.name}</option>})
                                            }
                                </select>
                            </div>                         
                            <div className="form-group">
                                <label for="exampleInputEmail1">Units Required</label>
                                <input type="text" name="units" value={donorData.units} onChange={handleChange} className="form-control" placeholder="Enter units required" />
                            </div>
                            <div className="form-group mt-3">
                                <label for="exampleInputEmail1">Required Date: &nbsp;</label>
                                <DatePicker selected={date} className='form-control text-center' onChange={(date) => setDate(date)} dateFormat="MMMM d, yyyy"/>
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary mt-2">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRequest
