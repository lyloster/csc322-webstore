import './../All.css';
import './SignIn.css';
import logo from './../img/webstore_logo.png';
import React, { useState } from "react";
import {  getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

//routing
import { useNavigate } from 'react-router-dom';

//functions
import {signin} from '../services/signin';
import {signup} from '../services/signup';

export function SignIn() {
  const navigate = useNavigate();
  const auth = getAuth();

  const returnHome = () => {
    navigate('/');
  };

  const goToSignUpPage = () => {
    navigate('/SignUp');
  };

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const SignIn = async (e) => {
      e.preventDefault()

      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/customer")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
    }

  return (
    <div className="SignInPage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="HomeButton" onClick={returnHome}>Home</button>

        <h2>Sign In</h2>

        <form className="Form">

          <p className="Email">Email</p>

          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>

          <p className="Password">Password</p>

          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>

          <br></br>
          <br></br>

        </form>

        <button onClick={SignIn}>Sign In</button>

        <div className="New"></div>

        <h3>New here? Become a customer today</h3>

        <button onClick={goToSignUpPage}> Create an account</button>

        {/*
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>
        */}

    </div>

  );
}
