import './../All.css'
import './AddWalletPage.css'
import logo from './../img/webstore_logo.png'
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import { getFirestore, doc, updateDoc, getDoc} from 'firebase/firestore';
import React, { useState } from 'react';

//routing
import { useNavigate } from 'react-router-dom';

//functions
import { addToBalance } from '../services/addToBalance';

export function AddWalletPage() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [amount, setAmount] = useState('');

  const returnHome = () => {
    navigate('/');
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  //TODO: Customer object, to get id, add id to link after implementing Customer object
  const goToProfilePage = () => {
    navigate('/customer');
  };

  const addToBalance = async () => {
    const user = auth.currentUser;
    const userDocRef = doc(db, 'users', user.uid);

    if (amount <= 0) {
      <p className="Denied">Please enter an amount greater than $0.</p>
      return;
    }

    try {
      // Get the current balance from Firestore
      const walletDoc = await getDoc(userDocRef);
      const currentBalance = walletDoc.data().wallet;

      // Calculate the new balance
      const newBalance = currentBalance + amount;

      // Update the wallet document in Firestore with the new balance
      await updateDoc(userDocRef, { wallet: newBalance });

      // Reset the form
      setCardNumber("");
      setExpirationDate("");
      setAmount("");

      // Show a success message
      alert(`Successfully added $${amount} to your wallet!`);

    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="AddWalletPage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="ProfileButton" onClick={goToProfilePage}>Profile</button>

        <button className="HomeButton" onClick={returnHome}>Home</button>

        <h2>Add Money to Wallet</h2>

        <form className="Form">

          <p className="BankCard">Card number</p>

          <input type="number" name="CardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Enter your card number"/>

          <p className="ExpirationDate">Expiration Date</p>

          <input type="date" name="Expiration" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} placeholder="Enter the expiration date (MM/YY)"/>

          <p className="AddAmount">Amount</p>

          <input type="number" name="Amount" value={amount} onChange={(event) => setAmount(parseFloat(event.target.value))} placeholder="Enter the amount to add"/>

          <br></br>
          <br></br>

        </form>

        <button onClick={ addToBalance }>Add to wallet</button>

        {/*
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>
        */}

    </div>

  );
}
