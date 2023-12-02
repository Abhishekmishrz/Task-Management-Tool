import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ProjectList = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects', { headers: { 'x-auth-token': token } });
        console.log(response.data); // Handle project data
      } catch (err) {
        console.error(err.response.data); // Handle errors
      }
    };

    fetchProjects();
  }, [token]);

  return (
    <div>
      <h1>Project List</h1>
      {/* Display projects here */}
    </div>
  );
};

export default ProjectList;
