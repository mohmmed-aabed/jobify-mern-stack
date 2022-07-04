import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/Navbar';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, toggleSidebar, logoutUser } = useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            className="btn"
            type="button"
            onClick={() => setShowLogout((showLogout) => !showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown${showLogout ? ' show-dropdown' : ''}`}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
