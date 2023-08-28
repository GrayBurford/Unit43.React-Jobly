
import React, { useState } from 'react';
import './CompanySearchForm.css';

function CompanySearchForm ({ searchCompany }) {
    const INITIAL_STATE = '';
    const [formData, setFormData] = useState(INITIAL_STATE);

    function handleChange (evt) {
        setFormData(evt.target.value);
    }

    function handleSubmit (evt) {
        evt.preventDefault();
        searchCompany(formData);
        setFormData(INITIAL_STATE);
    }

    return (
        <form className="CompanyList-Form" onSubmit={handleSubmit}>
            <label htmlFor='searchCriteria'></label>
            <input 
                className="CompanyList-Input"
                id='searchCriteria'
                name='searchCriteria'
                placeholder='Enter Company Search Criteria ...'
                onChange={handleChange}
                value={formData}
            />
            <button className="CompanyList-Button" type='submit'>Search!</button>
        </form>
    )
}

export default CompanySearchForm;
