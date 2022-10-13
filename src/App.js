import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  // ---------------Google Sign In----------------- 
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('Error', error);
      })
  }
  // ---------------GitHub Sign In----------------- 
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('Error', error);
      })
  }

  // ----------------Sign Out-----------------------
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      })
  }

  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button>
          :
          <div>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGitHubSignIn}>GitHub Sign In</button>
          </div>
      }

      {
        user.uid && <div>
          <h3>Name: {user.displayName}</h3>
          <p>Email Address: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
