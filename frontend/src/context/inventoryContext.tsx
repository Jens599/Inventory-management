import React, { createContext, useReducer } from 'react';

export const InventoryContext = createContext();

export const InventoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INVENTORY':
      return { inventory: action.payload };
    case 'ADD_INVENTORY':
      return { inventory: [action.payload, ...state.inventory] };
    case 'DELETE_INVENTORY':
      return {
        inventory: state.inventory.filter((i) => i._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const InventoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(InventoryReducer, {
    inventory: null,
  });

  return (
    <InventoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};
