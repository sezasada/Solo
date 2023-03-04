import React from 'react';
import './RegisterPage.css';
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <div className='bo'>
        <RegisterForm />
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </button>
        </center>
      </div>
    </div>
  );
}

export default RegisterPage;
