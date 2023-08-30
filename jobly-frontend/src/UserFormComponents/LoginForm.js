
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginForm ({ login }) {
    const INITIAL_STATE = {
        username : "",
        password : ""
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
        const response = await login(formData);
        if (response.success) {
            history.push('/');
        } else {
            setFormErrors(response.errors);
        }
    }

    return (
        <main>
            <div className="LoginForm">
                <h1>Login Now to start job searching!</h1>
                <hr></hr>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="username">Username: </label>
                        <input 
                            className="LoginForm-Input"
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
                            className="LoginForm-Input"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}>
                        </input>

                        <hr></hr>

                        {formErrors.length ? <h1>ERRORS!</h1> : null}

                        <button className="LoginForm-Button" type="submit" onSubmit={handleSubmit}>Sign In!</button>

                    </form>
            </div>
        </main>
    )
}

export default LoginForm;