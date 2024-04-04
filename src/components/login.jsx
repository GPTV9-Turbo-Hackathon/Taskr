import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

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
      const userCredential = await signInAnonymously(auth);
      // Anonymous login successful.
      const db = getDatabase(auth.app, "https://taskr-46a3f-default-rtdb.asia-southeast1.firebasedatabase.app");
      const user = userCredential.user;
      // Create a reference to the user's points in the Realtime Database
      const pointsRef = ref(db, 'users/' + user.uid + '/points');
      // Set the user's points to 100
      await set(pointsRef, 100);
      console.log("User points set to 100 for anonymous user");
    } catch (error) {
      console.error("Error signing in anonymously or setting user points", error);
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