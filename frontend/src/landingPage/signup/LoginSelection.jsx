import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSelection.css';
import logo from '/Media/Logo.png';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

function LoginSelection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        const currentPath = window.location.pathname;
        if (user.email === 'abhishekwarke214@gmail.com') {
          if (currentPath !== '/admin-dashboard') {
            navigate('/admin-dashboard');
          }
        } else {
          if (currentPath !== '/user-dashboard') {
            navigate('/user-dashboard');
          }
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setErrorMessage('Your email is not verified. Verification email sent. Please check your inbox.');
        await auth.signOut();
        return;
      }

      // Store name + email in localStorage (we assume name based on known email for now)
      let name = "User";
      if (email === "abhishekwarke214@gmail.com") {
        name = "Admin Abhishek";
      } else if (email === "abhishek.warke2004@gmail.com") {
        name = "Abhishek Warke";
      }

      localStorage.setItem("user", JSON.stringify({ name, email }));

      if (email === 'abhishekwarke214@gmail.com') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-selection-container">
      <div className="login-selection-header mt-5">
        <Link to="/"><img src={logo} alt="Abhinik Logo" className="logo mt-5" /></Link>
        <h3 className="subheading">Login to continue your journey with us</h3>
      </div>

      <div className="login-selection-box">
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleLogin} autoComplete='off'>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>

      <div className="signup-reference">
        <p className="signup-text">
          Don’t have an account? <Link to="/signup" className="signup-link">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginSelection;
