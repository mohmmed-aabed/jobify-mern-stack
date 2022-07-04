import { NavLink } from 'react-router-dom';

import links from '../utils/links';

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            key={id}
            to={path}
            onClick={toggleSidebar}
            className={({ isActive }) => {
              return `nav-link${isActive ? ' active' : ''}`;
            }}
          >
            <span className="icon">{icon}</span> {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;