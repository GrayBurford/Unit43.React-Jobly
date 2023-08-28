
import React, { useState } from 'react';
import './JobSearchForm.css';

function JobSearchForm ({ searchJob }) {
    const INITIAL_STATE = '';
    const [formData, setFormData] = useState(INITIAL_STATE);

    function handleChange (evt) {
        setFormData(evt.target.value);
    }

    function handleSubmit (evt) {
        evt.preventDefault();
        searchJob(formData);
        setFormData(INITIAL_STATE);
    }

    return (
        <form className="JobList-Form" onSubmit={handleSubmit}>
            <label htmlFor='searchCriteria'></label>
            <input 
                className="JobList-Input"
                id='searchCriteria'
                name='searchCriteria'
                placeholder='Enter Job Search Criteria ...'
                onChange={handleChange}
                value={formData}
            />
            <button className="JobList-Button" type='submit'>Search!</button>
        </form>
    )
}

export default JobSearchForm;