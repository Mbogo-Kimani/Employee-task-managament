import React, { createContext, useState } from 'react';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

  const loginUser = (userData) => {
    setUserData(userData);
  };

  const updateUser = (data) => {
    const updatedUserData = {...userData };
    Object.keys(data).forEach((key) => {
        if(key in userData){
          updatedUserData[key] = data[key]
        }
    })
    setUserData(updatedUserData)
    localStorage.setItem('user',JSON.stringify(userData))
  }

  const logoutUser = () => {
    setUserData(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  };


  return (
    <AppContext.Provider value={{ userData, loginUser, logoutUser, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};
