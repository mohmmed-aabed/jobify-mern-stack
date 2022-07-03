import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
