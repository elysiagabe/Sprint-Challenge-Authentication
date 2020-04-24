import React, { useState } from 'React';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const LoginForm = (props) => {
    const [creds, setCreds] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value  
        })
    }

    const login = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/api/auth/login', creds)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.payload);
                // props.history.push('/jokes');
                setLoggedIn(true);
            })
            .catch(err => console.log('There was an error logging in: ', err))
    }

    return (
        <div>
            <form onSubmit={login} >
                <h2>Login into Dad Jokes</h2>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    name="username"
                    id="username"
                    value={creds.username}
                    onChange={handleInputChange}
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password" 
                    id="password"
                    value={creds.password}
                    onChange={handleInputChange}
                />

                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LoginForm;