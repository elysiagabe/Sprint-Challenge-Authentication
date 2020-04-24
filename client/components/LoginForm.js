import React, { useState, useContext } from 'React';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { JokeContext } from '../contexts/JokeContext';

const LoginForm = (props) => {
    const { setLoggedIn } = useContext(JokeContext);
    
    const [creds, setCreds] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = e => {
        setCreds({
            ...creds,
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
                props.history.push('/jokes');
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
            <Link to="/register">Don't have an account yet? Register now.</Link>
        </div>
    )
}

export default LoginForm;