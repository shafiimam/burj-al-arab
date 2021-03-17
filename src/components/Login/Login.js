import firebase from 'firebase';
import React, { useContext } from 'react';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" }};

  const [loogedInUser,setLoggedInUser] = useContext(UserContext)
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }else {
        firebase.app();
     }
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var user = result.user;
    const {displayName,email} = user;
    const signedInUser = {name:displayName,
    email:email}
    setLoggedInUser(signedInUser);
    history.replace(from);
    console.log(signedInUser);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });
    }
    

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;