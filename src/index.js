import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/user'; // Use named import
import { NotificationsProvider } from './components/Alert';

ReactDOM.render(
  <UserProvider>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </UserProvider>,
  document.getElementById('root')
);

reportWebVitals();