import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';

import SignupForm from './UserFormComponents/SignupForm';
import LoginForm from './UserFormComponents/LoginForm';
import ProfileForm from './UserFormComponents/ProfileForm';

import CompanyList from './CompanyComponents/CompanyList';
import CompanyDetail from './CompanyComponents/CompanyDetail';
import JobList from './JobComponents/JobList';


function Routes ({ register, login, logout }) {
    
    
    return (    
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/signup">
                <SignupForm register={register} />
            </Route> 

            <Route exact path="/login">
                <LoginForm login={login} />
            </Route> 

            <Route exact path="/companies">
                <CompanyList />
            </Route>

            <Route exact path="/companies/:handle">
                <CompanyDetail />
            </Route>

            <Route exact path="/jobs">
                <JobList />
            </Route> 
                       
            <Route exact path="/profile">
                <ProfileForm />
            </Route>

            <Redirect to="/" />
        </Switch>        
        
    )
}

export default Routes;