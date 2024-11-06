import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function HospitalHome() {
    const [bloodGroupCounts, setBloodGroupCounts] = useState([]);
    const [totalDonors, setTotalDonors] = useState(0);
    const hospitalId = localStorage.getItem('hospitalId');

    useEffect(() => {
        const fetchBloodGroupCounts = async () => {
            try {
                const res = await axios.get(`${baseUrl}/blood-collection/${hospitalId}`);
                if (res.data) {
                    setBloodGroupCounts(res.data.blood_group_count);
                    setTotalDonors(res.data.total_donors);
                }
            } catch (error) {
                console.error('Error fetching blood group counts:', error);
            }
        };
        fetchBloodGroupCounts();
    }, [hospitalId]);

    return (
        <div className='container mt-4'>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col-12">
                    <div className="card text-bg-secondary h-100">
                        <div className="card-body">
                            <div className="card-title">
                              <span className='h2'>Total Donors:</span>  &nbsp;
                              <span className='h3'>{totalDonors}</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            <div className="row row-cols-1 row-cols-md-3 mt-3 g-4">
                {bloodGroupCounts.map((bloodGroup, index) => (
                    <div className="col" key={index}>
                        <div className="card text-bg-danger h-100">
                            <div className="card-body">
                                <h2 className="card-title">{bloodGroup.blood__name}</h2>
                                <p className="card-text">Total units: {bloodGroup.total_units}</p>
                            </div>
                        </div>
                    </div>
                ))}
              
            </div>
        </div>
    );
}

export default HospitalHome;
