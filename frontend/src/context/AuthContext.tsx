import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    // Get the user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if there is a user in localStorage and dispatch 'LOGIN' if present
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []); // Empty dependency array ensures this effect runs once when mounted

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
