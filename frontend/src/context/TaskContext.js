import React, { createContext, useReducer, useContext, useCallback } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    // Add more cases for other actions
    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('/api/tasks');
      dispatch({ type: 'FETCH_TASKS', payload: response.data });
    } catch (err) {
      console.error(err.response.data); // Handle errors
    }
  }, []);

  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  // Add more actions as needed

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, fetchTasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => useContext(TaskContext);

export { TaskProvider, useTaskContext };
