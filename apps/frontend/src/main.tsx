import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import ColorResistance from './app/components/ColorResistance';

function App() {
  return <ColorResistance />;
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
