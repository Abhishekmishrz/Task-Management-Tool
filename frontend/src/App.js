import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <Router>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/projects" component={ProjectList} />
              <Route path="/projects/new" component={ProjectForm} />
              <Route path="/tasks" component={TaskList} />
              <Route path="/tasks/new" component={TaskForm} />
            </Switch>
          </Router>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  );
};

export default App;
