
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignupForm.css';

function SignupForm ({ register }) {
    const INITIAL_STATE = {
        username : "",
        password : "",
        firstName : "",
        lastName : "",
        email : ""
    }
    const history = useHistory();

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    function handleChange (evt) {
        const { name, value } = evt.target;
        setFormData(data => ({...data, [name] : value }));
    };

    async function handleSubmit (evt) {
        evt.preventDefault();
        const response = await register(formData);
        if (response.success) {
            history.push('/');
        } else {
            setFormErrors(response.errors);
        }
    }

    return (
        <main>

            <div className="SignupForm">
                <h1>Register Now to start job searching!</h1>
                <hr></hr>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="username">Username: </label>
                        <input 
                            className="SignupForm-Input"
                            type="text"
                            name="username"
                            id="username" 
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}>
                        </input>
                        <hr></hr>
                        <label htmlFor="password">Password: </label>
                        <input 
                            className="SignupForm-Input"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}>
                        </input>
                        <hr></hr>
                        <label htmlFor="password">First Name: </label>
                        <input 
                            className="SignupForm-Input"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleChange}>
                        </input>
                        <hr></hr>
                        <label htmlFor="password">Last Name: </label>
                        <input 
                            className="SignupForm-Input"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleChange}>
                        </input>
                        <hr></hr>
                        <label htmlFor="password">Email Address: </label>
                        <input 
                            className="SignupForm-Input"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter your E-Mail Address"
                            value={formData.email}
                            onChange={handleChange}>
                        </input>
                        <hr></hr>

                        {formErrors.length ? <h1>ERRORS!</h1> : null}

                        <button className="SignupForm-Button" type="submit" onSubmit={handleSubmit}>Sign Up!</button>
                    </form>
            </div>
        </main>
    )
}

export default SignupForm;

