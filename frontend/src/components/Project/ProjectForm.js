import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ProjectForm = () => {
  const { token } = useContext(AuthContext);
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = projectData;

  const onChange = (e) => setProjectData({ ...projectData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/projects', projectData, { headers: { 'x-auth-token': token } });
      console.log(response.data); // Handle success or redirect to project list
    } catch (err) {
      console.error(err.response.data); // Handle errors
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={title} onChange={onChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={description} onChange={onChange} required />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
