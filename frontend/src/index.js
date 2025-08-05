import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Login';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <App />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
