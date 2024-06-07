import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/user'; // Use named import
import { NotificationsProvider } from './components/Alert';
import { HostelProvider } from './HostelContext';

ReactDOM.render(
  <UserProvider>
   <HostelProvider>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </HostelProvider>
  </UserProvider>,
  document.getElementById('root')
);

reportWebVitals();
