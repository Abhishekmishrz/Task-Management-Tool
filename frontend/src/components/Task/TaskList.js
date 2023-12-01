import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const TaskList = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', { headers: { 'x-auth-token': token } });
        console.log(response.data); // Handle task data
      } catch (err) {
        console.error(err.response.data); // Handle errors
      }
    };

    fetchTasks();
  }, [token]);

  return (
    <div>
      <h1>Task List</h1>
      {/* Display tasks here */}
    </div>
  );
};

export default TaskList;
