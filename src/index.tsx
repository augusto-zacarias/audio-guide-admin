import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import ErrorPage from './Screens/Error/ErrorPage';
import { authProvider } from "./auth";
import Login, { loginAction, loginLoader } from './Screens/Login/Login';
import { protectedLoader } from './Screens/Protected/ProtectedPage';
import Register from './Screens/Register/Register';
import CreatePoint from './Screens/CreatePoint/CreatePoint';
import ListPoints from './Screens/ListPoints/ListPoints';

const router = createBrowserRouter([
  {
    id: 'root',
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: authProvider.username };
    },
    Component: App,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        loader: protectedLoader
      },
      {
        path: "point",
        loader: protectedLoader,
        Component: CreatePoint,
      },
      {
        path: "list",
        loader: protectedLoader,
        Component: ListPoints,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: Login,
      },
      {
        path: "register",
        action: loginAction,
        loader: loginLoader,
        Component: Register,
      }
    ]
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await authProvider.signout();
      return redirect("/");
    },
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>}/>
    </ThemeProvider>
  </React.StrictMode>
);
