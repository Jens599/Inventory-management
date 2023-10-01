import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  // Get the context from AuthContext provider
  const context = useContext(AuthContext);

  // If there is no context, throw an error to provide a clear message
  if (!context) {
    throw new Error(
      'useAuthContext must be used inside an AuthContextProvider'
    );
  }

  // Return the context obtained from useContext
  return context;
};
