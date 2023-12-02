import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const TaskForm = () => {
  const { token } = useContext(AuthContext);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: '',
    status: 'To Do',
  });

  const { title, description, deadline, priority, status } = taskData;

  const onChange = (e) => setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/tasks', taskData, { headers: { 'x-auth-token': token } });
      console.log(response.data); // Handle success or redirect to task list
    } catch (err) {
      console.error(err.response.data); // Handle errors
    }
  };

  return (
    <div>
      <h1>Create Task</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={title} onChange={onChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={description} onChange={onChange} required />
        </div>
        <div>
          <label>Deadline</label>
          <input type="date" name="deadline" value={deadline} onChange={onChange} required />
        </div>
        <div>
          <label>Priority</label>
          <select name="priority" value={priority} onChange={onChange} required>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={status} onChange={onChange} required>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
