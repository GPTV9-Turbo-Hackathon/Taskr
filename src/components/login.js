import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginWithEmailPassword = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // User logged in
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

function Login() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}

// Example usage:
// loginWithEmailPassword('user@example.com', 'password123');
