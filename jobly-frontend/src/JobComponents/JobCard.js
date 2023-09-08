
import React, { useContext, useState } from 'react';
import './JobCard.css';
import UserContextObject from '../UserContext';

function JobCard ({ id, title, salary, equity, handle, name }) {
    const { apply, hasApplied, currUser } = useContext(UserContextObject);
    const [applied, setApplied] = useState(null);

    const userApps = currUser.applications;

    function handleApply () {
        if(hasApplied(id)) return;
        apply(id);
        setApplied(true);
    }

    return (
        <div className='JobCard'>
            <div>
                <h3>{title} </h3>
                <hr></hr>
                <div><strong>{name}</strong></div>
                <div>Salary: {salary}</div>
                <div>Equity: {equity || 0}</div>
                <hr></hr>
                <button
                    style={{
                        backgroundColor : applied || userApps.includes(id) 
                        ? 'lightpink' 
                        : 'lightgreen'
                    }} 
                    onClick={handleApply} 
                    className='JobCard-Button'>
                    { 
                        applied || userApps.includes(id) 
                        ? "Already Applied!" 
                        : "Apply Now!" 
                    }                    
                </button>
            </div>            
        </div>
        
    )
};

export default JobCard;