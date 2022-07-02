import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/ErrorPage';
import notFoundImage from '../assets/images/not-found.svg';

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notFoundImage} alt="not found" />
        <h3>page not found</h3>
        <p>We can't find the page you're looking for!</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
