import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Login } from './app/components/Login';
import { AuthRequired } from './app/components/AuthRequired';
import Estacionamiento from './app/components/Estacionamiento';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route element={<AuthRequired />}>
        <Route path="home" element={<Estacionamiento />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
