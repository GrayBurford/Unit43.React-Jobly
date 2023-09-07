
import React, { useState, useEffect } from 'react';
import JoblyApi from '../API';
import './JobList.css';
import JobCard from './JobCard';
import JobSearchForm from './JobSearchForm';
import Alert from '../helpers/Alert';


function JobList () {
    const [jobs, setJobs] = useState([]);
    const [formErrors, setFormErrors] = useState([]);

    async function getAllJobs () {
        const allJobs = await JoblyApi.getJobs();
        setJobs(allJobs);
        // console.log('ALL JOBS:', allJobs);
    }

    async function searchJob (title) {
        try {
            setFormErrors([]);
            const resp = await JoblyApi.getJobs(title);
            setJobs(resp);
        } catch (err) {
            setFormErrors(err);
        }

    }

    useEffect(() => {
        getAllJobs();
    }, []);

    return (        
        <div className="JobList">
            <div>
                <JobSearchForm searchJob={searchJob} />
                {formErrors.length 
                    ? <Alert type="danger" messages={formErrors} /> 
                    : null
                }
                <h1>Job List</h1>
            </div>

            <div>
                {jobs.map(job => (
                    <JobCard 
                        id={job.id}
                        key={job.id}
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                        handle={job.companyHandle}
                        name={job.companyName}
                    />
                ))}
            </div>
        </div>

    )
}

export default JobList;