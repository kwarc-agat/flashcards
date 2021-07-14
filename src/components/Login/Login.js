import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import PersonIcon from '@material-ui/icons/Person';

async function loginUser(credentials){
  
    const response = await fetch('https://localhost:44311/account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return await response.json();
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        if (!token.error){
          setToken(token);
          window.location.href = "/";
        }
        else
          setError(token.error)
    }

  return(
    <div className="login-wrapper">
      
      <form onSubmit={handleSubmit}>
      <PersonIcon class="icon"/>
      <br/>
        <label>
          <p>Username</p>
          <input type="text" class="input-custom" placeholder="Username" onChange={
              e => setUserName(e.target.value)
              }/>
        </label>
        <br/>
        <label>
          <p>Password</p>
          <input type="password" class="input-custom" placeholder="Password" onChange={
              e => setPassword(e.target.value)
          }/>
        </label>
        <br/><br/>
        <div>
          <button class="btn btn-secondary input-custom" type="submit">Log in</button>
        </div>
        <a href="/Signup">Don't have an account? Sign up here</a>
        <div class="error">{error}</div>
      </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}