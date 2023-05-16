import './../All.css';
import './CartPage.css';
import logo from './../img/webstore_logo.png';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Build } from './components/Build';
import { BuildsInStore} from './components/BuildsInStore';
import { getBuildById } from '../services/getBuildById';

//db
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc} from 'firebase/firestore';

export function CartPage() {
  //params
  const { userId, buildIds } = useParams();
  //states
  const [email, setEmail] = useState(userId);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  const [buildIdsOnReturn, setBuildIdsOnReturn] = useState(buildIds);
  const [isPurchaseComplete, setPurchaseComplete] = useState(false);
  const [description, setDescription] = useState('');

  //routing
  const navigate = useNavigate();

  //persist already added items to cart for user
  const handleClick_Home = () => {
    navigate(`/${email}/${buildIdsOnReturn}`);
  };

  //load map with all builds
  const allBuilds = BuildsInStore();

  useEffect(() => {
    //check if cart is empty
    if (buildIds === undefined || buildIds === null) {
        setIsEmptyCart(true);
        return;
      }
    //split build ids from the url
    const buildIdsArray = buildIds.split('_');

    let totalPrice = 0;
    const addedItems = [];

    //calculate total price for builds in cart
    for (const id of buildIdsArray) {
        //get build info by id
        const item = getBuildById(allBuilds, id);
        if (item) {
            console.log(item);
            totalPrice += item.price;
          } else {
            console.log('Item not found');
          }
          //add build to array of Added to cart builds
          addedItems.push(item);
    }
    //set state to use Builds in the return statement
    setItems(addedItems);
    setTotal(totalPrice.toFixed(2));
    setIsEmptyCart(false);
    setBuildIdsOnReturn('');
  }, [allBuilds, buildIds]);

  //start db
  const auth = getAuth();
  const db = getFirestore();

  //get user
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

    // Retrieve the user's data as id from Firestore
    const getUserData = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUserData(userData);
        setEmail(userData.email);
        setName(userData.name);
        setWallet(userData.wallet);
      } else {
        console.log("User not found");
      }
    };

    getUserData();

  }, [user, db]);

 // subtract from wallet and refresh cart
 const handleCheckout = () => {
  //get what's left if the purchase is completed
  const left = Number((wallet - total).toFixed(2));
  const db = getFirestore();
  const userDoc = doc(db, "users", user.uid);
  const buildDoc = doc(db, "builds", user.uid);

  const currentDate = new Date();
  const dateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  if (total == 0) {
    alert("Your cart is empty. Please add to your cart in order to check out.")
  }
  else {
    //check if user has enough funds
    if (left < 0) {
      alert("You do not have enough funds to complete the purchase!");
      //add a warning
      const currentWarning = userData.warnings;
      //issue a warning
      updateDoc(userDoc, {warnings: currentWarning + 1}, { merge: true });
    } else {
      // Update the wallet balance in the database
      updateDoc(userDoc, { wallet: left}, { merge: true });
      setDoc(buildDoc, { description: items[0].desc, total: total, date: dateOnly.toISOString().slice(0, 10).replace(/-/g, '/') });

      // Clear the cart items and set the total to zero
      setItems([]);
      setTotal(0);
      setPurchaseComplete(true);
    }
  }

};

const emptyCartCheck = () => {
  if (isEmptyCart) {
    return (
      <div className="CartPage">
        <img className="Logo" src={logo} />
        <h2> Your cart</h2>
        <div>
          <h3>Cart is Empty &#x2639;</h3>
        </div>
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>
      </div>
    );
  }
}

//render element if purchase is complete
if (isPurchaseComplete) {
  return (
    <div className="CartPage">
      <button className="HomeButton" onClick={handleClick_Home}>Home</button>
      <img className="Logo" src={logo} onCanPlay={handleClick_Home}/>
      <h2> Your cart</h2>
      <div>
        <h3>Thank you for your purchase, {name} &#x1F600;! </h3>
      </div>
      <footer>
        <p>© 2023 A&K Custom PC</p>
      </footer>
    </div>
  );
}

return (
  <div className="CartPage">
    <button className="HomeButton" onClick={handleClick_Home}>Home</button>
    <img className="Logo" src={logo} onClick={handleClick_Home} />
    <h2> {name}'s cart</h2>

    <div>
      {items.map((item, index) => {
        return (
          <div className="card-cart" key={index}>
            {item !== null ? <Build build={item} /> : emptyCartCheck() }

          </div>
        );
      })}
    </div>

    <div className="total">Total: ${total}</div>

    <button className="checkout" onClick={handleCheckout}>
      Checkout
    </button>
  </div>
);
}
