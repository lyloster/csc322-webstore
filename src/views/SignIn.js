import './../All.css';
import './SignIn.css';
import logo from './../img/webstore_logo.png';
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

//routing
import { useNavigate } from 'react-router-dom';

//functions
import { signin } from '../services/signin';
import { signup } from '../services/signup';

export function SignIn() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [accountstatus, setAccountStatus] = useState('');

  const returnHome = () => {
    navigate('/');
  };

  const goToSignUpPage = () => {
    navigate('/SignUp');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setRole(userData.role);
        setStatus(userData.application_status);
        setAccountStatus(userData.account_status);
      } else {
        console.log("User not found");
      }

      if (role === "customer" && accountstatus === "open") {
        navigate("/customer");
      }
      if (role === "owner") {
        navigate("/owner");
      }
      if (role === "employee") {
        navigate("/employee");
      }
      if (role === "customer" && accountstatus === "closed") {
        alert("Your account is closed due to too many warnings. Please see a store employee in person to complete account closure.");
      }
      if (role === "visitor" && status === "pending") {
        window.alert('Your application is pending. Please check back later.');
      }
      if (role === "visitor" && status === "denied") {
        if (window.confirm("Your application has been denied. Do you want to submit a dispute?")) {
          const disputeReason = window.prompt("Please enter the reason for your dispute:");
            if (disputeReason !== null) {
                await updateDoc(userDocRef, {dispute: disputeReason}, { merge: true });
            }
        }
      }

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
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

      <button onClick={handleSignIn}>Sign In</button>

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
