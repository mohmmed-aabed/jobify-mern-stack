import { Link } from 'react-router-dom';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

import { useAppContext } from '../context/appContext';
import JobInfo from './JobInfo';
import Wrapper from '../assets/wrappers/Job';
import formatDate from '../utils/formatDate';

const Job = ({
  _id: id,
  position,
  company,
  jobLocation,
  jobType,
  status,
  createdAt,
}) => {
  const { setEditId, deleteJob } = useAppContext();

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={formatDate(createdAt)} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              className="btn edit-btn"
              to="/add-job"
              onClick={() => setEditId(id)}
            >
              edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(id)}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
