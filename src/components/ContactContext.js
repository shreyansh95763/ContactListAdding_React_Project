import React, { createContext, useContext, useReducer } from 'react';

// Create a context
const HabitContext = createContext();

// Define a reducer function
const habitReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_HABIT':
      return [...state, action.payload];
    case 'REMOVE_HABIT':
      // return state.filter((habit) => habit !== action.payload);
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

// Create a context provider component
export const HabitProvider = ({ children }) => {
  const [habits, dispatch] = useReducer(habitReducer, []);

  const addHabit = (habit) => {
    dispatch({ type: 'ADD_HABIT', payload: habit });
  };

  const removeHabit = (habit) => {
    dispatch({ type: 'REMOVE_HABIT', payload: habit });
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, removeHabit }}>
      {children}
    </HabitContext.Provider>
  );
};

// Create a custom hook to access the context
export const useContactContext = () => {
  return useContext(HabitContext);
};
