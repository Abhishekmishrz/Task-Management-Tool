import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProjectList from './components/Project/ProjectList';
import TaskList from './components/Task/TaskList';
import ProjectForm from './components/Project/ProjectForm';
import TaskForm from './components/Task/TaskForm';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { TaskProvider } from './context/TaskContext';

const App = () => {
  return (
        <Router>
          <Routes>
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
          </Routes>
        </Router>
  );
};

export default App;
