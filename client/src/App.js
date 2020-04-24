import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
//contexts
import { JokeContext } from '../contexts/JokeContext';
//components 
import PrivateRoute from '../components/PrivateRoute';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm'
import Jokes from '../components/Jokes';
import { axiosWithAuth } from '../utils/axiosWithAuth';


function App() {
  const [jokes, setJokes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get('/api/jokes')
      .then(res => {
        setLoggedIn(true)
        setJokes(res.data)
      })
      .catch(err => console.log("error fetching data", err))
  })

  
  return (
    <JokeContext.Provider value={{ jokes, loggedIn, setLoggedIn }}>
      <div className="App">
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={SignUpForm} />
        <PrivateRoute path="/jokes" component={Jokes} />
      </div>
    </JokeContext.Provider>
  );
}

export default App;
