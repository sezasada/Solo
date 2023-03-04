import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css';
import { useHistory } from 'react-router-dom';
function RegisterForm() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (

    <form className="formPanel" style={{  maxWidth: '450px', minWidth: '300px', maxHeight: '400px', width: '30%', height: '60%', margin: '100px auto', backgroundColor: '#FFFFFF', borderRadius: '25px'}} onSubmit={registerUser} >
      <h2 style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username"
          style={{
            paddingBottom: '0.5rem',
            color: 'black'
          }}> Username
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            style={{
              backgroundColor: 'transparent',
              width: '130%',
              boxSizing: 'border-box',
              border: 'none',
              fontSize: '1.3rem',
              paddingBottom: '1rem',
              boxShadow: 'inset 0px -3px 0px 0px rgba(187,187,187,0.2)',
              transition: 'box-shadow 0.2s ease-in'
            }}
            onFocus={(event) => event.target.style.boxShadow = 'inset 0px -3px 0px 0px rgba(34,193,195,0.7)'}
            onBlur={(event) => event.target.style.boxShadow = 'inset 0px -3px 0px 0px rgba(187,187,187,0.2)'}
            placeholder="Enter your username"
          />
          <style>{`
    input[name="username"]::placeholder {
      opacity: 1;
      transition: opacity 0.25s ease-out;
    }
    input[name="username"]:focus::placeholder,
    input[name="username"]:hover::placeholder {
      opacity: 0;
    }
  `}</style>
        </label>
      </div>

      <div>
        <label htmlFor="password"
          style={{
            paddingBottom: '0.5rem',
            color: 'black'
          }}>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            style={{
              backgroundColor: 'transparent',
              width: '130%',
              boxSizing: 'border-box',
              border: 'none',
              fontSize: '1.3rem',
              paddingBottom: '1rem',
              boxShadow: 'inset 0px -3px 0px 0px rgba(187,187,187,0.2)',
              transition: 'box-shadow 0.2s ease-in'
            }}
            onFocus={(event) => event.target.style.boxShadow = 'inset 0px -3px 0px 0px rgba(34,193,195,0.7)'}
            onBlur={(event) => event.target.style.boxShadow = 'inset 0px -3px 0px 0px rgba(187,187,187,0.2)'}
            placeholder="Enter your password"
          />
        </label>
        <style>
          {`
            input[name="password"]::placeholder {
              opacity: 1;
              transition: opacity 0.25s ease-out;
            }
            input[name="password"]:focus::placeholder,
            input[name="password"]:hover::placeholder {
              opacity: 0;
            }
          `}</style>
      </div>
      <div style={{ }}>
        <input className="btn" type="submit" name="submit" value="Register"
          style={{
            borderRadius: '25px',
            width: '100%',
            height: '40px',
            fontSize: '1.3rem',
            color: 'white',
            fontWeight: '700',
            background: 'rgb(34,193,195)',
            background: 'linear-gradient(90deg, #707070, #707070, #707070)',
            border: '0px',
            cursor: 'pointer',
            transition: 'opacity 0.25s ease-out',
          }}
          onMouseOver={(event) => event.target.style.opacity = '0.7'}
          onMouseOut={(event) => event.target.style.opacity = '1'}
        />
      
      </div>
    </form>

  );
}

export default RegisterForm;
