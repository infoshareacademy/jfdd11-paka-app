import React, { useContext } from 'react';

import './Auth.css';

import { AuthContext } from '../../context/AuthContext';

const Auth = ({ cover, children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : cover ? cover() : <p>You have to be logged in</p>;
};

export default Auth;