import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//init firebase
import './firebase-config';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Login from './components/login';



function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return (
    <div>
      <h2>About Page</h2>
      {/* Outlet would be used here if this component had nested routes */}
    </div>
  );
}

function NotFound() {
  return <h2>404 Not Found</h2>;
}

export default App
