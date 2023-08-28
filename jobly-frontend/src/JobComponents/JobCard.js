
import React from 'react';
import './JobCard.css';
import { Link } from 'react-router-dom';

function JobCard ({ title, salary, equity, handle, name }) {
    return (
        <div className='JobCard'>
            <div>
                <h3>{title} </h3>
                <hr></hr>
                <div><strong>{name}</strong></div>
                <div>Salary: {salary}</div>
                <div>Equity: {equity || 0}</div>
                <hr></hr>
                <Link to={'/'}><button className='JobCard-Button'>Apply!</button></Link>
            </div>            
        </div>
        
    )
};

export default JobCard;