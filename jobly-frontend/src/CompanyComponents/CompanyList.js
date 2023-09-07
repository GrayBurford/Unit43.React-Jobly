
import React, { useContext, useEffect, useState } from 'react';
import JoblyApi from '../API';
import CompanyCard from './CompanyCard';
import './CompanyList.css';
import CompanySearchForm from './CompanySearchForm';
import UserContextObject from '../UserContext';


function CompanyList () {
    const [companies, setCompanies] = useState([])
    const { currUser } = useContext(UserContextObject);

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
        <React.Fragment>
            {currUser? (
                <>
                    <div className="CompanyList">
                        <div>
                            <CompanySearchForm searchCompany={getCompany} />
                            <h3>Welcome Back, {currUser.firstName}!</h3>
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
                </>
            ) : (
                <>
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
                </>
            )}
        </React.Fragment>
    )
}

export default CompanyList;