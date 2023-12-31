
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import JoblyApi from './API';
import useLocalStorage from './hooks/useLocalStorage';
import jwt from 'jsonwebtoken';
import UserContextObject from './UserContext';
import Loading from './Loading';

export const TOKEN_STORAGE_ID = "jobly-token";


function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currUser, setCurrUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [appliedApplicationIds, setAppliedApplicationIds] = useState(new Set([]));
  console.log(`localstorage on App.js render:`, localStorage);


  // Load currUser from API (JoblyApi). Only runs once user gets verified token.
  useEffect(() => {
    async function getCurrUser () {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // Puts user token on the JoblyApi class to be able to call functions on API
          JoblyApi.token = token;
          let user = await JoblyApi.getUser(username);
          setCurrUser(user);
        } catch (err) {
          console.error('Login Failed!', err);
        }
      }
      setIsLoaded(true);
    }
    setIsLoaded(false);
    getCurrUser();
  }, [token]);


  // Registers a new user
  async function register (formData) {
    try {
      let token = await JoblyApi.register(formData);
      setToken(token);
      return { success : true };
    } catch (err) {
      console.error("Register failed!", err);
      return { success : false, err };
    }
  };


  // Authenticates and logs in an existing user
  async function login (formData) {
    try {
      let token = await JoblyApi.login(formData);
      setToken(token);
      return { success : true };
    } catch (err) {
      console.error("Login Failed!", err);
      return { success : false, err };
    }
  };


  // Logs out an existing user
  function logout () {
    setToken(null);
    setCurrUser(null);
    console.log(`localstorage on logout function:`, localStorage);
    console.log("LOGGED OUT!")
  };


  // Checks if user has applied for this jobId
  function hasApplied (jobId) {
    return appliedApplicationIds && appliedApplicationIds.has(jobId);
  };

  function apply (jobId) {
    console.log(`APPLYING TO jobId:`, jobId)
    if (hasApplied(jobId)) return;
    JoblyApi.applyToJob(currUser.username, jobId);
    setAppliedApplicationIds(new Set([...appliedApplicationIds, jobId]));
  }


  if (!isLoaded) return <Loading />;


  return (
    <div className="App">
      <BrowserRouter>
        <UserContextObject.Provider
          value={{ 
            currUser, 
            setCurrUser, 
            appliedApplicationIds, 
            setAppliedApplicationIds,
            apply,
            hasApplied 
          }}
        >
          <NavBar 
            logout={logout} 
          />
          <Routes 
            register={register}
            login={login}
          />
        </UserContextObject.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;