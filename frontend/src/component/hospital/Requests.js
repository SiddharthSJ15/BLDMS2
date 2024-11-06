import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Requests() {
    const [requestedData, setRequestedData] = useState([]);
    const [collectedBlood, setCollectedBlood] = useState([]); 
    const [donorData, setDonorData] = useState({
        requested_by: '', 
        units_recieved: '',
    });
    const [selectedRequest, setSelectedRequest] = useState(null);

    const hospitalId = localStorage.getItem('hospitalId'); 

    useEffect(() => {
        axios.get(`${baseUrl}/blood-request/`)
            .then((res) => setRequestedData(res.data.results))
            .catch(error => console.log(error));

        axios.get(`${baseUrl}/blood-collection/`)
            .then((res) => setCollectedBlood(res.data.results))
            .catch(error => console.log(error));
    }, []);

    const handleDonationSubmit = () => {
        const donationData = { ...donorData, donated_by: hospitalId };

        console.log("Submitting donation data:", donationData); 

        axios.post(`${baseUrl}/donate-blood/`, donationData)
            .then((response) => {
                setRequestedData((prev) => prev.filter(item => item.id !== response.data.requested_id));
                alert("Donation submitted successfully");
            })
            .catch((error) => console.log(error));
    };

    const openModal = (request) => {
        setSelectedRequest(request);  
        setDonorData({ ...donorData, requested_by: request.id });
    };

    const handleUnitChange = (e) => {
        const selectedUnits = parseInt(e.target.value, 10);
        setDonorData((prev) => ({ ...prev, units_recieved: selectedUnits }));

        console.log("Units received updated:", selectedUnits); // Log the selected units
    };

    return (
        <div className='container mt-4'>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {requestedData.map((data, index) => (
                    <div className="col" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h6 className="fw-bold">Name: <span className='fst-italic'>{data.user}</span></h6>
                                <h6 className="fw-light">Blood Group: <span className='fst-italic'>{data.blood.name}</span></h6>
                                <h6 className="fw-lighter">Name: <span className='fst-italic'>{data.required_on}</span></h6>

                                
                                <button type="button" onClick={() => openModal(data)} className="btn btn-danger text-center mt-3" data-bs-toggle="modal" data-bs-target="#donateModal">
                                    Donate
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="modal fade" id="donateModal" tabIndex="-1" aria-labelledby="donateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="donateModalLabel">Select Blood Units for Donation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Blood Group Needed:</strong> {selectedRequest?.blood.name}</p>
                            <p><strong>Required By:</strong> {selectedRequest?.required_on}</p>
                            <p><strong>Units Requested:</strong> {selectedRequest?.units}</p>

                            <form>
                                <div className="form-group">
                                    <label>Select Blood Units:</label>
                                    <select className="form-control" onChange={handleUnitChange}>
                                        <option value="">Select units</option> 
                                        {collectedBlood.map((blood, index) => (
                                            <option key={index} value={blood.units}>
                                                {blood.blood.name} - {blood.units} units available
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleDonationSubmit}>Confirm Donation</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Requests;
