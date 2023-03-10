import React from 'react';
import './RegisterPage.css';
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
 
      <div className='bo'>
        <RegisterForm />
        <center>
          <input
            onClick={() => {
              history.push('/login');
            }}
            className="btn" type="submit" name="submit" value="Login"
            style={{
              borderRadius: '25px',
              width: '100px',
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
        </center>
      </div>
  

  );
}

export default RegisterPage;
