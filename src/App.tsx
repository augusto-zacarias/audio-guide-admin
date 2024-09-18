import React from 'react';
import './App.css';
import { Link,Outlet } from 'react-router-dom';
import SignIn from './Components/SignIn';

function App() {
  return (
    <div>
      This is the home screen
      <Link to='/login'>go login</Link>
      <Link to='/protected'>go proteceted</Link>
      <Link to='/'>go home</Link>
      <Outlet />
    </div>
  );
}


export default App;
