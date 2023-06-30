import { createContext, useReducer } from 'react';

interface data {
  _id: string;
  name: string;
  brand: string;
  category: string;
  style: string;
  supplier: string;
  purchasePrice: number;
  quantity: number;
  availability: number;
  salesPrice: number;
  createdAt: string;
}

interface dataObject {
  inventory: data[];
  dispatch: ({}) => data[];
}

const defaultValue = {} as dataObject;

export const InventoryContext = createContext<dataObject>(defaultValue);

export const InventoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INVENTORY':
      return { inventory: action.payload };
    case 'ADD_INVENTORY':
      return { inventory: [action.payload, ...state.inventory] };
    case 'UPDATE_INVENTORY':
      return {
        inventory: state.inventory.map((i: data) => {
          i._id === action.payload._id ? action.payload : i;
        }),
      };
    case 'DELETE_INVENTORY':
      return {
        inventory: state.inventory.filter(
          (i: data) => i._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const InventoryContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(InventoryReducer, {
    inventory: null,
  });

  return (
    <InventoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};
