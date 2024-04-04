import { useState, useEffect } from 'react';
import './App.css';
//init firebase
import './firebase-config';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';

import UserMain from './components/UserMain';

function App() {
  // Simulate a user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    // This observer gets called whenever the user's sign-in state changes.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setIsLoggedIn(true);
      } else {
        // User is signed out.
        setIsLoggedIn(false);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Simulate a login function
  const logout = () => {
    auth.signOut();
    setIsLoggedIn(false);
  };

  return (
    <div className="h-full w-full">
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={isLoggedIn ? <Navigate to="/main" /> : <Home auth={auth} />} />
              <Route path="/main" element={isLoggedIn ? <UserMain onSignoutClick={logout} /> : <Navigate to="/" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <Route path="*" element={<Login auth={auth} />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

function Home({ auth }) {
  const logout = () => {
    auth.signOut();
  };

  return (
    <div>
      <p>Your User ID: {auth.currentUser.uid}</p>
      <h2>Home Page</h2>
      <button onClick={logout}>Logout</button>
      <Navigate to="/main" />
    </div>
  );
}

export default App;
