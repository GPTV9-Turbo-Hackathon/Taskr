import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//init firebase
import './firebase-config';

import Reward from './components/reward'

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Login from './components/login';


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
  const logout = () => setIsLoggedIn(false);
  
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home auth={auth} />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="reward" element={<Reward />} />
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

export default App
