import './../All.css'
import './OwnerPage.css'
import logo from './../img/webstore_logo.png'
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, getDoc, getFirestore, collection, query, where, getDocs, updateDoc} from "firebase/firestore";
import React, { useState, useEffect} from 'react';

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

  const [deniedUsers, setDeniedUsers] = useState([]);

  const getDeniedUsers = async () => {
  const deniedUsersRef = collection(db, "users");
  const deniedUsersQuery = query(deniedUsersRef, where("application_status", "==", "denied"));
  const deniedUsersSnapshot = await getDocs(deniedUsersQuery);
  const deniedUsers = [];
  deniedUsersSnapshot.forEach((doc) => {
    deniedUsers.push({ uid: doc.id, ...doc.data() });
  });
    setDeniedUsers(deniedUsers);
  };

  useEffect(() => {
    getDeniedUsers();
  }, [db]);

  const keepUser = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {application_status: "deniedByOwner"});
    getDeniedUsers();
  };

  const overrideUser = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {application_status: "approved", role: "customer"});
    getDeniedUsers();
  };

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
        {deniedUsers.map((user) => (
            <div key={user.uid}>
            <p>Visitor Name: {user.name}</p>
            <p>Visitor Email: {user.email}</p>
            <p>Rejected Reason: {user.memo}</p>
            <p>Customer Dispute: {user.dispute}</p>
            <button className="KeepButton" onClick={() => keepUser(user.uid)}>Keep Decision</button>
            <button className="OverrideButton" onClick={() => overrideUser(user.uid)}>Override Decision</button>

          </div>
        ))}
        </div>

        {/*
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>
        */}

    </div>

  );
}
