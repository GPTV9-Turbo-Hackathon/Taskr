import React, { createContext, useContext, useState, useEffect } from 'react';
import './App.css';
//init firebase
import {auth} from './firebase-config';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import AddTask from './components/AddTask';
import UserMain from './components/UserMain';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // If user is logged in, store user details in localStorage
        const userData = { uid: user.uid, email: user.email }; // Simplified user data
        localStorage.setItem('user', JSON.stringify(userData));
        setCurrentUser(user);
      } else {
        // If user is logged out, clear the stored user and set currentUser to null
        localStorage.removeItem('user');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Initialize currentUser from localStorage if it exists
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function App() {
  // Simulate a user authentication state
  const { currentUser } = useAuth(); // Use the useAuth hook here
  const isLoggedIn = !!currentUser;
  
  useEffect(() => {
    // This will now re-run whenever currentUser changes, ensuring currentUser is not null when accessed
    if (currentUser) {
      console.log(currentUser.uid);
    }
  }, [currentUser]); // Add currentUser as a dependency

  // Simulate a login function
  const logout = () => {
    auth.signOut();
    // setIsLoggedIn(false); // This line seems to be a mistake since isLoggedIn is derived from currentUser and not directly set
  };

  return (
   
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={isLoggedIn ? <Navigate to="/main" /> : <Home auth={auth} />} />
              <Route path="/main" element={<UserMain onSignoutClick={logout} />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/addtask" element={<AddTask auth={auth} />} />
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

export default function AppWithAuthProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}