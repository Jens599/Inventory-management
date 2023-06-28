import { useContext } from 'react';
import { InventoryContext } from '../context/inventoryContext';

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);

  if (!context) {
    throw Error(
      'useInventoryContext must be used inside an InventoryContextProvider'
    );
  }

  return context;
};
