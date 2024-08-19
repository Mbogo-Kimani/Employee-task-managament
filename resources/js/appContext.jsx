import React, { createContext, useEffect, useState } from 'react';
import requestHandler from './services/requestHandler';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // TODO: Should fetch the info below from a cache store or relative place instead of localstorage
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
  const [client, setClient] = useState(JSON.parse(localStorage.getItem('client')));

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
    <AppContext.Provider value={{ userData, loginUser, logoutUser, updateUser, client }}>
      {children}
    </AppContext.Provider>
  );
};
