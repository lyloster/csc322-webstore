import './../All.css'
import './CustomerPage.css'
import logo from './../img/webstore_logo.png'
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect} from 'react';
import { getFirestore } from 'firebase/firestore';

//routing
import { useNavigate } from 'react-router-dom';

//functions
import { signout } from '../services/signout';

export function CustomerPage() {
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  const [name, setName] = useState('');
  const [compliments, setCompliments] = useState('');
  const [warnings, setWarnings] = useState('');
  const [wallet, setWallet] = useState('');

  const returnHome = () => {
    navigate('/');
  };

  const goToCartPage = () => {
    navigate('/cart');
  };

  const goToAddBalancePage = () => {
    navigate('/addBalance');
  };

  useEffect(() => {
    const getUserData = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setName(userData.name);
        const compliments = userDocSnap.data().compliments;
        setCompliments(userData.compliments);
        const warnings = userDocSnap.data().warnings;
        setWarnings(userData.warnings);
        const wallet = userDocSnap.data().wallet;
        setWallet(userData.wallet);
      } else {
        console.log("User not found");
      }
    }
    getUserData();
  }, [user]);

  return (
    <div className="CustomerPage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="CartButton" onClick={goToCartPage}>Cart</button>

        <button className="SignOutButton" onClick={signout}>Sign Out</button>

        <button className="HomeButton" onClick={returnHome}>Home</button>

        <h2>{name}'s Overview</h2>

        <div className="Sections">

          <div className="Compliments">
            <h3>Compliments</h3>
            <p>{compliments}</p>
          </div>

          <div className="Warnings">
            <h3>Warnings</h3>
            <p>{warnings}</p>
          </div>

          <div className="Wallet">
            <h3>Wallet</h3>
            <p>${wallet}</p>
            <button className="AddButton" >+</button>
          </div>

        </div>

        <h2>What would you like to view today?</h2>

        <div className="Actions">
          {/* add routing to buttons */}
          <button className="PurchaseButton" onClick={goToAddBalancePage}>Past Purchases</button>

          <button>My Suggested Builds</button>

          <button>Messages</button>

        </div>

        <div className="Purchase">

          <p>Order ID: 1</p>
          <p>Date Completed: 4/20/2023</p>
          <p>Order Details: Player One x 1</p>
          <p>Price: $3400.56</p>
          <button className="ViewButton">View Details</button>

        </div>

        {/*
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>
        */}

    </div>

  );
}
