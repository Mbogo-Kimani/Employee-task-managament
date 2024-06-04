import React, { createContext, useState } from 'react';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

  const loginUser = (userData) => {
    setUserData(userData);
  };

  const logoutUser = () => {
    setUserData(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  };


  return (
    <AppContext.Provider value={{ userData, loginUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};
