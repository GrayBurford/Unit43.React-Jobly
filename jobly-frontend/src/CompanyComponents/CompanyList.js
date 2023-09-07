
import React, { useContext, useEffect, useState } from 'react';
import JoblyApi from '../API';
import CompanyCard from './CompanyCard';
import './CompanyList.css';
import CompanySearchForm from './CompanySearchForm';
import UserContextObject from '../UserContext';
import Alert from '../helpers/Alert';


function CompanyList () {
    const [companies, setCompanies] = useState([])
    const { currUser } = useContext(UserContextObject);
    const [formErrors, setFormErrors] = useState([]);

    async function getAllCompanies () {
        const allCompanies = await JoblyApi.getCompanies();
        setCompanies(allCompanies);
    }

    async function getCompany (search) {
        try {
            setFormErrors([]);
            const resp = await JoblyApi.getCompanies(search);
            setCompanies(resp);
        } catch (err) {
            setFormErrors(err);
        }
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
                            {formErrors.length 
                                ? <Alert type="danger" messages={formErrors} /> 
                                : null
                            }
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