import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api'
function AddDonor() {
    const [bloodData,setBloodData] = useState([])
    const [donorData, setDonorData] = useState({
        name: '',
        dob: '',
        blood: '',
        contact: ''
    })

    useEffect(()=>{
        try {
            axios.get(baseUrl+'/blood-group/')
            .then((res)=>{
                setBloodData(res.data.results)
                // console.log(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    },[])


    const handleChange = (event) => {
        setDonorData({
            ...donorData,
            [event.target.name]: event.target.value
        })
    }

    const submitForm = () =>{
        const donorFormData =  new FormData();
        donorFormData.append('name', donorData.name);
        donorFormData.append('dob', donorData.dob);
        donorFormData.append('contact', donorData.contact);
        donorFormData.append('blood', donorData.blood);
        try {
            axios.post(baseUrl+'/add-donor/',donorFormData)
            .then((res)=>{
                if(res.status===200 || res.status===201 ){
                    Swal.fire({
                        title: 'Donor has been added',
                        icon: 'success',
                        timer:2000,
                        toast: true,
                        position: 'top-end',
                        timerProgressBar: true,
                        showConfirmButton: false,                                           
                    })
                      .then(() => { 
                          window.location.href='/hospital-home'
                      });
                }
            });
        } catch (error) {
            
        }
    } 

    return (
        <div className='conatainer mt-5'>
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
                                <input type="text" name="dob" value={donorData.dob} onChange={handleChange} className="form-control" placeholder="Donor age" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Blood Group</label>
                                <select name='blood' onChange={handleChange} className='form-select'>
                                    <option selected disabled>Select Blood Group</option>
                                            {
                                                bloodData.map((opts,index)=> {return <option key={index} value={opts.id}>{opts.name}</option>})
                                            }
                                </select>
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary mt-2">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDonor
