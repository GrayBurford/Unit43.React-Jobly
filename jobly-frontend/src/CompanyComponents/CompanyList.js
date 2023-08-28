
import React, { useEffect, useState } from 'react';
import JoblyApi from '../API';
import CompanyCard from './CompanyCard';
import './CompanyList.css';
import CompanySearchForm from './CompanySearchForm';


function CompanyList () {
    const [companies, setCompanies] = useState([])

    async function getAllCompanies () {
        const allCompanies = await JoblyApi.getCompanies();
        setCompanies(allCompanies);
    }

    async function getCompany (search) {
        const resp = await JoblyApi.getCompanies(search);
        setCompanies(resp);
    }

    useEffect(() => {
        getAllCompanies();
    }, []);

    return (
        <div className="CompanyList">
            <div>
                <CompanySearchForm searchCompany={getCompany} />
                <h1>Company List</h1>
            </div>

            <div>
                {companies.map(c => (
                    <CompanyCard 
                        description={c.description}
                        handle={c.handle}
                        name={c.name}
                        logoUrl={c.logoUrl}
                        numEmployees={c.numEmployees}
                        key={c.handle}
                    />
                ))}
            </div>
        </div>
    )
}

export default CompanyList;