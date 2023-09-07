
import React, { useContext, useState } from 'react';
import './ProfileForm.css';
import UserContextObject from '../UserContext';
import JoblyApi from '../API';
import Alert from '../helpers/Alert';
import { useHistory } from 'react-router-dom';

function ProfileForm () {
    const { currUser, setCurrUser } = useContext(UserContextObject);

    const INITIAL_STATE = {
        username : currUser.username,
        password : "",
        firstName : currUser.firstName,
        lastName : currUser.lastName,
        email : currUser.email
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const [editConfirmed, setEditConfirmed] = useState(false);
    const history = useHistory();


    function handleChange (evt) {
        const { name, value } = evt.target;
        setFormData(data => ({...data, [name] : value }));
    };


    async function handleSubmit (evt) {
        evt.preventDefault();

        let userData = {
            firstName : formData.firstName,
            lastName : formData.lastName,
            email : formData.email,
            password : formData.password
        };

        try {
            const updatedUser = await JoblyApi.editProfile(currUser.username, userData);
            console.log("PATCH USER RESPONSE:", updatedUser);

            setCurrUser(updatedUser);

        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormData((updatedUser) => ({
            ...updatedUser, password : ""
        }));
        setFormErrors([]);
        setEditConfirmed(true);

        history.push('/');
        
    }

    return (
        <main>
            <div className="ProfileForm">
                <h1>Edit your Profile: {formData.username}</h1>
                <hr></hr>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="username">Username: </label>
                        <input 
                            className="SignupForm-Input"
                            disabled
                            autoComplete={formData.username}
                            type="text"
                            name="username"
                            id="username" 
                            value={formData.username}
                            onChange={handleChange}
                        >
                        </input>
                        <hr></hr>
                        <label htmlFor="firstName">First Name: </label>
                        <input 
                            className="ProfileForm-Input"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter new first name"
                            value={formData.firstName}
                            onChange={handleChange}>
                        </input>
                        <hr></hr>
                        <label htmlFor="lastName">Last Name: </label>
                        <input 
                            className="ProfileForm-Input"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter new last name"
                            value={formData.lastName}
                            onChange={handleChange}>
                        </input>
                        <hr></hr>
                        <label htmlFor="email">Email Address: </label>
                        <input 
                            className="ProfileForm-Input"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter new E-Mail Address"
                            value={formData.email}
                            onChange={handleChange}>
                        </input>
                        <hr></hr>
                        <label htmlFor="password">Enter password to confirm changes: </label>
                        <input 
                            className="ProfileForm-Input"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="**********"
                            value={formData.password}
                            onChange={handleChange}>
                        </input>

                        {formErrors.length 
                            ? <Alert type="danger" messages={formErrors} /> 
                            : null
                        }

                        {editConfirmed 
                            ? <Alert type="success" messages={ ["Update Was Successful!" ] }/> 
                            : null
                        }

                        <button className="ProfileForm-Button" type="submit" onSubmit={handleSubmit}>Save Changes!</button>
                    </form>
            </div>
        </main>
    )
}

export default ProfileForm;

