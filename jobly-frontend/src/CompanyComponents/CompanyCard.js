
import React from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg, CardSubtitle, Button } from 'reactstrap';
import './CompanyCard.css';
import logos from '../helpers/companyLogos';
import { Link } from 'react-router-dom';

function CompanyCard ({ description, handle, name, logoUrl, numEmployees }) {

    function randLogo () {
        const randIdx = Math.floor(Math.random() * logos.length);
        let path = '/logoImages/';
        path += logos[randIdx];
        return path;
    }


    return (
        <div className="CompanyCard">
            <Card className="CompanyCard-Card">
                <Link to={`/companies/${handle}`}>
                    <CardImg className="CompanyCard-Img"
                        alt={randLogo()}
                        src={randLogo()}
                    />
                </Link>
                <hr></hr>
                <CardBody>
                    <Link to={`/companies/${handle}`}>
                        <CardTitle tag="h5">
                            {name}
                        </CardTitle>
                    </Link>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Number of Employees: {numEmployees}
                    </CardSubtitle>
                    <CardText>
                        {description}
                    </CardText>
                    <hr></hr>
                    <Button className='CompanyCard-Button'>Go to Jobs</Button>
                </CardBody>
            </Card>
        </div>
      );
}

export default CompanyCard;
