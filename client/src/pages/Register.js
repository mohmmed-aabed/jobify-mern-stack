import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow, Logo } from '../components';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const toggleMember = () => {
    setCredentials({
      ...credentials,
      isMember: !credentials.isMember,
      name: '',
      email: '',
      password: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, isMember } = credentials;
    if (!email || !password || (!name && !isMember)) {
      displayAlert();
      return;
    }
    if (isMember) {
      // login
      setupUser({ email, password }, 'login');
    } else {
      // register
      setupUser({ email, password, name }, 'register');
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{credentials.isMember ? 'login' : 'register'} </h3>
        {/* alert */}
        {showAlert && <Alert />}
        {/* name input */}
        {!credentials.isMember && (
          <FormRow
            type="text"
            name="name"
            value={credentials.name}
            handleChange={handleChange}
          />
        )}
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={credentials.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={credentials.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'Please wait...' : 'submit'}
        </button>
        <p>
          {credentials.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {credentials.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
