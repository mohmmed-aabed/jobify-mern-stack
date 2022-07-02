import { useState } from 'react';

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
  const [user, setUser] = useState(initialState);
  const { showAlert, displayAlert } = useAppContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const toggleMember = () => {
    setUser({
      ...user,
      isMember: !user.isMember,
      name: '',
      email: '',
      password: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email || !user.password || (!user.name && !user.isMember)) {
      displayAlert();
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{user.isMember ? 'login' : 'register'} </h3>
        {/* alert */}
        {showAlert && <Alert />}
        {/* name input */}
        {!user.isMember && (
          <FormRow
            type="text"
            name="name"
            value={user.name}
            handleChange={handleChange}
          />
        )}
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={user.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={user.password}
          handleChange={handleChange}
        />
        <button className="btn btn-block">Submit</button>
        <p>
          {user.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {user.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
