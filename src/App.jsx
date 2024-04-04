import { useState, useEffect } from 'react';
import './App.css';
//init firebase
import './firebase-config';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';

import UserMain from './components/UserMain';
import Reward from './components/Reward';

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
  const login = () => setIsLoggedIn(true);
  const logout = () => {
    auth.signOut();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home auth={auth} />} />
            <Route path="about" element={<About />} />
            <Route path="/main" element={<UserMain onSignoutClick={logout} />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <Route path="*" element={<Login auth={auth} />} />
        )}
      </Routes>
    </Router>
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

function About() {
  return (
    <div>
      <h2>About Page</h2>
    </div>
  );
}
function NotFound() {
  return <h2>404 Not Found</h2>;
}

export default App;
