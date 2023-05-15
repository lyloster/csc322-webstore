import './../All.css'
import './SignUp.css';
import React, { useState } from "react";
import logo from './../img/webstore_logo.png';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

//routing
import { useNavigate } from 'react-router-dom';

export function SignUp() {

  const navigate = useNavigate();
  const auth = getAuth();

  const returnHome = () => {
    navigate('/');
  };

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] =useState(null)

  const SignUp = async (e) => {
      e.preventDefault()

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);

            const db = getFirestore();
            const userDoc = doc(db, "users", user.uid);
            setDoc(userDoc, { name: name, email: email, role: "visitor", application_status: "pending", compliments: 0, warnings: 0, wallet: 0.00 }, { merge: true });

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
    <div className="SignUpPage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="HomeButton" onClick={returnHome}>Home</button>

        <h2>Create Account</h2>

        <p className="FirstName">First Name</p>

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your first name"/>

        <p className="Email">Email</p>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>

        <p className="Password">Password</p>

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>

        <br></br>
        <button onClick={SignUp}>Sign Up</button>

        {/*
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>
        */}

    </div>

  );
}
