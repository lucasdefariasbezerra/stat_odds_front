/* eslint-disable react/prop-types */
import React, { Component, useEffect, useState } from 'react';
import { Button, CheckBox, Form, Input } from 'antd';
import '../../template/style.css';
import { result } from 'lodash';

const LoginPage = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    /*useEffect(() => {
      document.body.style.background = '#1aff66';
    });*/

    const handleLogin = () => {
      const formData = new FormData();
      formData.append('grant_type', 'password');
      formData.append('username', userName);
      formData.append('password', password);

      const headerReq = new Headers();
      headerReq.append('Authorization', `Basic ${btoa('cli1:sec1')}`);

      const reqObj = {
        method: 'POST',
        body: formData,
        headers: headerReq
      };

      fetch('http://localhost:8083/oauth/token', reqObj)
        .then((response) => response.json())
        .then(result => {
          if (result['error']) {
            console.log('handle error');
          } else {
            const { onTokenInsert } = props;
            const { access_token } = result;
            localStorage.setItem('odds-user-info', access_token);
            onTokenInsert();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    return (
      <div className="form-container">
        <div className='form-item login-text'>
            <p>user name:</p>
            <Input size="large" style={{ width: 225, marginBottom: 18 }}
              onChange={event => setUserName(event.target.value)}
             />
        </div>
        <div className='form-item login-text'>
            <p>password:</p>
            <Input.Password size="large" style={{ width: 225, marginBottom: 15 }}
              onChange={event => setPassword(event.target.value)} />
        </div>
        <Button type="primary" className="btn-form" onClick={() => handleLogin()}>Login</Button>
      </div>
    );
};

export default LoginPage;