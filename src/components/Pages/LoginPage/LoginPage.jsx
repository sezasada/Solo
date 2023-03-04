import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <div className='bo'>
        <LoginForm />
        <center>
          <input
            onClick={() => {
              history.push('/registration');
            }}
            className="btn" type="submit" name="submit" value="Register"
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
    </div >
  );
}

export default LoginPage;
