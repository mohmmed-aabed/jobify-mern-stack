import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Alert, FormRow } from '../../components';
import { useAppContext } from '../../context/appContext';
import FormRowSelect from '../../components/FormRowSelect';

const AddJob = () => {
  const {
    isLoading,
    displayAlert,
    showAlert,
    jobLocation,
    isEditing,
    position,
    company,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    handleChange,
    clearValues,
    createJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      return;
    }
    createJob({ position, company, jobLocation, jobType, status });
  };

  const handleJobChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobChange}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobChange}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handleChange={handleJobChange}
          />
          <FormRowSelect
            options={jobTypeOptions}
            name="jobType"
            value={jobType}
            handleChange={handleJobChange}
            labelText="job type"
          />
          <FormRowSelect
            options={statusOptions}
            name="status"
            value={status}
            handleChange={handleJobChange}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'submit'}
            </button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={clearValues}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
