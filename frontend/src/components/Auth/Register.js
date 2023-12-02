import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
  });
  
  const { username, email, password  } = formData;
  
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitData = {username, email, password};
  console.log(submitData,"submitData");
  
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/register', submitData,).then((res) => {
      console.log(res);
      navigate('/login');
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
      
      <Link to="/login">Already have an account? Login here</Link>
    </div>
  );
};

export default Register;
