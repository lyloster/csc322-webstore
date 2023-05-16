import './../All.css'
import './CustomerPage.css'
import logo from './../img/webstore_logo.png'
import React, { useState, useEffect } from 'react';

//db
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
//routing
import { useNavigate } from 'react-router-dom';

//components
import  Loading  from './components/Loading';

//functions
import { signout } from '../services/signout';


export function CustomerPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  const [name, setName] = useState('');
  const [compliments, setCompliments] = useState('');
  const [warnings, setWarnings] = useState('');
  const [wallet, setWallet] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const returnHome = () => {
    navigate('/');
  };

  const goToCartPage = () => {
    navigate('/cart');
  };

  const goToAddBalancePage = () => {
    navigate('/customer/addBalance');
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  };

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, [auth]);

  useEffect(() => {
    // Check if the user is authenticated
    if (!user) {
      return; // Early return if the user is not authenticated
    }

    // Retrieve the user's name from Firestore
    const getUserData = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setName(userData.name);
        setCompliments(userData.compliments);
        setWarnings(userData.warnings);
        setWallet(userData.wallet);
        setIsLoading(false);
      } else {
        console.log("User not found");
      }
    };

    getUserData();

  }, [user, db]);

  // Wrap the code block inside an async function
  const closeAccount = async () => {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    await updateDoc(userDocRef, { account_status: "closed" }, { merge: true });
    signOutUser();
  };

  if (!isLoading && wallet === 0) {
    alert("Your wallet cannot be empty. Please add some money.")
    navigate('/customer/addBalance');
  }

  if (!isLoading && warnings >= 3) {
    alert("Your account will be closed due to too many warnings. Please see a store employee in person to complete account closure.");
    closeAccount();
  }

  // if (!user) {
  //   return <div className='customerPage'><Loading/></div>;
  // }

  return (
    <div className="CustomerPage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="CartButton" onClick={goToCartPage}>Cart</button>

        <button className="SignOutButton" onClick={signOutUser}>Sign Out</button>

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
            <button className="AddButton" onClick={goToAddBalancePage}>+</button>
          </div>

        </div>

        <h2>What would you like to view today?</h2>

        <div className="Actions">
          {/* add routing to buttons */}
          <button className="PurchaseButton">Past Purchases</button>

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
