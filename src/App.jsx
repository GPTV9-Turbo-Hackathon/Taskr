import { useState, useEffect } from 'react';
import './App.css';
//init firebase
import {auth} from './firebase-config';
import { getDatabase,ref, set } from 'firebase/database';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';

import UserMain from './components/UserMain';

function App() {
  // Simulate a user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const auth = getAuth();

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
<<<<<<< HEAD
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
=======
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
            <>
              <Route path="/" element={<Login auth={auth} />} />
              <Route path="/create-user" element={<CreateUser auth={auth} />} />
              <Route path="*" element={<Login auth={auth} />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
>>>>>>> 574284ba27c49e30da1f4df0e78359d8717e09a8
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
