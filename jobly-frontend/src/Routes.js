import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import CompanyList from './CompanyComponents/CompanyList';
import CompanyDetail from './CompanyComponents/CompanyDetail';
import JobList from './JobComponents/JobList';
import Profile from './Profile';


function Routes () {
    
    
    return (    
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/signup">
                <SignupForm />
            </Route> 

            <Route exact path="/login">
                <LoginForm />
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
                <Profile />
            </Route>

            <Redirect to="/" />
        </Switch>        
        
    )
}

export default Routes;