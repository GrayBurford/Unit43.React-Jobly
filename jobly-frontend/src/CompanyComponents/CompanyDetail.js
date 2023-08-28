
import React, { useEffect, useState } from 'react';
import './CompanyDetail.css';
import { Card, CardBody, CardText, CardTitle, CardImg } from 'reactstrap';
import { useParams } from 'react-router-dom';
import JoblyApi from '../API';
import logos from '../helpers/companyLogos';


function CompanyDetail () {
    const { handle } = useParams();
    const [company, setCompany] = useState([]);
    const [jobs, setJobs] = useState([]);

    function randLogo () {
        const randIdx = Math.floor(Math.random() * logos.length);
        let path = '/logoImages/';
        path += logos[randIdx];
        return path;
    }

    useEffect(() => {
        async function getCompanyInfo () {
            const resp = await JoblyApi.getCompany(handle);
            setCompany(resp);
            setJobs(resp.jobs);
        };
        getCompanyInfo();
    }, [handle]);

    // console.log('Handle:', handle);
    // console.log('Company:', company);
    // console.log('JOBS ARE:', jobs);

    return (
        <div className="CompanyDetail">
            <Card className="my-2 CompanyDetail-Card">
                <CardImg className='CompanyDetail-Img'
                    alt={randLogo()}
                    src={randLogo()}
                />
                <CardBody>
                    <CardTitle tag="h2">
                        {company.name}
                    </CardTitle>
                    <CardText>
                        <strong>About Us: </strong>{company.description}
                    </CardText>
                    <CardText>
                        <small className="text-muted">
                        Number of Employees: <strong>{company.numEmployees}</strong>
                        </small>
                    </CardText>
                </CardBody>
            </Card>

            <Card>
                <div className="CompanyDetail-JobCard">
                    {jobs.map(j => (
                        <div className='CompanyDetail-Job'> 
                            <div>{`Job Title: ${j.title}`}</div>
                            <div>{`Job Salary: ${j.salary}`}</div>
                            <div>{`Job Equity: ${j.equity}`}</div>
                            <button className='CompanyDetail-Button'>Apply Now</button>
                        </div>
                    ))}
                </div>

            </Card>



        </div>
      );
}

export default CompanyDetail;
