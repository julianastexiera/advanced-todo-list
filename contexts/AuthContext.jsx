import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = useTracker(() => Meteor.user());
  console.log('AuthProvider');
  console.log(user);
  const navigate = useNavigate();
  //const [user, setUser] = useState(null);

  const login = (user) => {
    console.log("login auth", { user });
    if (user) {
      navigate("/");
    }
  };

  const logout = () => {
    console.log("logout no AuthContext");
    navigate("/login");
    Meteor.logout();
    
  };

  return (
    <AuthContext.Provider
      value={{ authenticaded: !!user, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
