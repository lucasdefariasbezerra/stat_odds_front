import React, { Component, useState, useEffect } from 'react';
import { userInfo } from './graphqlRequests';
import '../../template/style.css';
import Routes from '../main/routes';
import LoginPage from './loginPage';

const LoginManagement = () => {

    const [token, setToken] = useState(undefined);

    const handleTokenInsertion = () => {
      const extractedToken = localStorage.getItem('odds-user-info');
      userInfo(extractedToken).then((data) => {
        const { userInfo } = data;
        localStorage.setItem('odds-user-details', JSON.stringify(userInfo));
        setToken(extractedToken);
      });
    };

    useEffect(() => {
      //document.body.style.background = token ? '#f2f2f2' : '#1aff66';
      if (token) {
        return;
      }
      const extractedToken = localStorage.getItem('odds-user-info');
      if (extractedToken) {
        setToken(extractedToken);
      }
    });

    return (
    <div>{token ? <Routes /> : <LoginPage onTokenInsert={handleTokenInsertion}/>}</div>
    );
};


export default LoginManagement;