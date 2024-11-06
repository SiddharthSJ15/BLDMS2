import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api'
function BloodCollection() {
    const [donorData, setDonorData] = useState({
        user: '',
        blood: '',
        units: ''
    })
    const [options, setOptions] = useState([]);
    const [selectedDonor, setSelectedDonor] = useState(null);

    useEffect(()=>{
        const fetchDonorOptions = async () => {
        try {
            const res = await axios.get(baseUrl+'/add-donor/');
            const donorOptions = res.data.results.map(donor => ({
                value: donor.id,
                label: `${donor.name} - ${donor.contact}`,
                bloodGroup: donor.blood.name,
                bloodId: donor.blood.id 
            }));
            setOptions(donorOptions);
        } catch (error) {
            console.error('Error fetching donor options:',error)
        }
    }
    fetchDonorOptions();
    },[])
    const handleSelectChange = (selectedOption) => {
        setDonorData({
            ...donorData,
            user: selectedOption.value
        });
        setSelectedDonor(selectedOption); // Store the selected donor
    };
    const handleChange = (event) => {
        setDonorData({
            ...donorData,
            [event.target.name]: event.target.value
        })
    }
    const hospitalId = localStorage.getItem('hospitalId');
    const submitForm = () =>{
        const donorFormData =  new FormData();
        donorFormData.append('created_by', hospitalId)
        donorFormData.append('user', donorData.user);
        donorFormData.append('units',donorData.units);
        donorFormData.append('blood', selectedDonor.bloodId);
        try {
            axios.post(baseUrl+'/blood-collection/',donorFormData)
            .then((res)=>{
                if(res.status===200 || res.status===201 ){
                    Swal.fire({
                        title: 'Blood collected',
                        icon: 'success',
                        timer:2000,
                        toast: true,
                        position: 'top-end',
                        timerProgressBar: true,
                        showConfirmButton: false,                                           
                    })
                      .then(function(){ 
                          window.location.href='/hospital-home'
                      });
                }
            });
        } catch (error) {
            
        }
    } 

    return (
        <div className='conatiner mt-5'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card text-bg-light'>
                        <h3 className='card-header'>BLOOD COLLECTION</h3>
                        <div className='card-body'>
                            <div className="form-group">
                                <Select placeholder="Enter Name or Mobile number" name="user" options={options} onChange={handleSelectChange}/>
                            </div>
                            {selectedDonor && (
                                <div className="form-group">
                                    <label htmlFor="bloodGroup">Blood Group</label>
                                    <input type="text" id="bloodGroup" value={selectedDonor.bloodGroup} className="form-control" readOnly />
                                </div>
                            )}
                            <div className="form-group">
                                <label for="exampleInputEmail1">Units</label>
                                <input type="text" name="units" value={donorData.transfer_units} onChange={handleChange} className="form-control" placeholder="Units of Blood collected" />
                            </div>                           
                            <button type="submit" onClick={submitForm} className="btn btn-primary mt-2">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BloodCollection
