import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/LandingPage';
import mainImage from '../assets/images/main.svg';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
            qui quasi aspernatur ratione. Quas facilis cupiditate vero eligendi
            repellat. Dignissimos ipsam harum delectus cumque quisquam itaque
            voluptatibus reiciendis velit distinctio.
          </p>
          <Link to="/register" className="btn btn-hero">
            login/register
          </Link>
        </div>
        {/* main image */}
        <img src={mainImage} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
