import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './components/LinkedinAuth/TemplateLoginAuth/Main/Main';
import './assets/css/Global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.Fragment>
    <LoginPage />
  </React.Fragment>, document.getElementById('root')
);