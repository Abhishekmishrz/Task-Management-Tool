import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const Login = () => {
  // const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      console.log(response.data); // Handle success or redirect to dashboard
      // history.push('/projects');
    } catch (err) {
      console.error(err); // Handle errors
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form >
        <div>
          <label>Email :</label>
          <input type="text" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit" onClick={onSubmit}>Login</button>
      </form>
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
};

export default Login;
