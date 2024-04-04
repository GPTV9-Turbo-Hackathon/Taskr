import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful.
    } catch (error) {
      console.error("Error signing in with email and password", error);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      // Anonymous login successful.
    } catch (error) {
      console.error("Error signing in anonymously", error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleAnonymousLogin}>Login Anonymously</button>
    </div>
  );
}

export default Login;