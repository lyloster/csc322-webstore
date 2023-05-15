import './../All.css'
import './OwnerPage.css'
import logo from './../img/webstore_logo.png'
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect} from 'react';
import { getFirestore } from 'firebase/firestore';

//routing
import { useNavigate } from 'react-router-dom';

//functions
import { addCompliment } from '../services/addCompliment';
import { addComplaint} from '../services/addComplaint'
import { signout } from '../services/signout';

export function OwnerPage() {
  const navigate = useNavigate();

  const handleClick_Home = () => {
    navigate('/');
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  const [name, setName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setName(userData.name);
      } else {
        console.log("User not found");
      }
    }
    getUserData();
  }, [user]);

  return (
    <div className="OwnerPage">

        <img className="Logo" src={logo} onClick={handleClick_Home}/>

        <button className="SignOutButton" onClick={signout}>Sign Out</button>

        <button className="HomeButton" onClick={handleClick_Home}>Home</button>

        <h2>{name}'s Overview</h2>

        <h2>What would you like to view today?</h2>

        <div className="Actions">

          <button className="RejectedButton">Rejected Sign Ups</button>

          <button onClick={addCompliment}>Compliments</button>

          <button onClick={addComplaint}>Complaints</button>

        </div>

        <div className="Rejected">

          <p>Visitor Name: Anthony Yang</p>
          <p>Visitor Email: anthonyyang48@gmail.com</p>
          <p>Rejected Reason: Previously made an account under a different email. Suspected abusing the system.</p>
          <p>Customer Dispute: My account was previously suspended and I've reached out multiple times with no response, so I'd like to make a new account.</p>
          <button className="KeepButton">Keep Decision</button>
          <button className="OverrideButton">Override Decision</button>

        </div>

        {/*
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>
        */}

    </div>

  );
}
