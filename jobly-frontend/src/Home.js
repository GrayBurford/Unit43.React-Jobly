
import React, { useContext } from 'react';
import './Home.css';
import UserContextObject from './UserContext';
import CompanyList from './CompanyComponents/CompanyList';

function Home () {
    const { currUser } = useContext(UserContextObject);

    return (
        <React.Fragment>
            {currUser ? (
                <CompanyList />
            ) : (
                <div className="Home">
                    <span>All Jobs In One Place</span>
                </div>
            )}
        </React.Fragment>
    )

}

export default Home;
