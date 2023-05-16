import './../All.css'
import './EmployeePage.css'
import logo from './../img/webstore_logo.png'
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect} from 'react';

//routing
import { useNavigate } from 'react-router-dom';

//functions
import {signout} from '../services/signout';

export function EmployeePage() {

    const navigate = useNavigate();

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    const [name, setName] = useState('');
    const [compliments, setCompliments] = useState('');
    const [warnings, setWarnings] = useState('');
    const [promotions, setPromotions] = useState('');
    const [demotions, setDemotions] = useState('');

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
          const promotions = userDocSnap.data().promotions;
          setPromotions(userData.promotions);
          const demotions = userDocSnap.data().demotions;
          setDemotions(userData.demotions);
        } else {
          console.log("User not found");
        }
      }
      getUserData();
    }, [user]);

    const [pendingUsers, setPendingUsers] = useState([]);
    const [memo, setMemo] = useState("");

    const handleDenyReason = (event) => {
      setMemo(event.target.value);
    };

    const getPendingUsers = async () => {
    const pendingUsersRef = collection(db, "users");
    const pendingUsersQuery = query(pendingUsersRef, where("application_status", "==", "pending"));
    const pendingUsersSnapshot = await getDocs(pendingUsersQuery);
    const pendingUsers = [];
    pendingUsersSnapshot.forEach((doc) => {
      pendingUsers.push({ uid: doc.id, ...doc.data() });
    });
      setPendingUsers(pendingUsers);
    };

    useEffect(() => {
      getPendingUsers();
    }, [db]);

    const approveUser = async (userId) => {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        account_status: "active",
        application_status: "approved",
        role: "customer"
      });
      getPendingUsers();
    };

    const denyUser = async (userId, memo) => {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {account_status: "denied", application_status: "denied", memo: memo}, { merge: true });
      getPendingUsers();
    };

  return (
    <div className="EmployeePage">

        <img className="Logo" src={logo}/>

        <button className="SignOutButton" onClick={signout}>Sign Out</button>

        <h2>{name}'s Overview</h2>

        <div className="Sections">

          <div className="Compliments">
            <h3>Compliments</h3>
            <p>{compliments}</p>
          </div>

          <div className="Promotions">
            <h3>Promotions</h3>
            <p>{promotions}</p>
          </div>

          <div className="Warnings">
            <h3>Warnings</h3>
            <p>{warnings}</p>
          </div>

          <div className="Demotions">
            <h3>Demotions</h3>
            <p>{demotions}</p>
          </div>

        </div>

        <h2>What would you like to view today?</h2>

        {/* TODO: add routing */}
        <div className="Actions">

          <button className="PendingButton">Pending Sign Ups</button>

          <button>My Suggested Builds</button>

          <button>Messages</button>

        </div>

        <div className="Pending">

        {pendingUsers.map((user) => (
          <div key={user.uid}>
            <p>Visitor Name: {user.name}</p>
            <p>Visitor Email: {user.email}</p>
            <button className="ApproveButton" onClick={() => approveUser(user.uid)}>Approve</button>
            <button className="DenyButton" onClick={() => {if (window.confirm("Are you sure you want to deny this application?")) {
              const denyReason = prompt("Please enter the reason for denial:");
              if (denyReason !== null) {
                setMemo(denyReason);
                denyUser(user.uid, denyReason);}}}}>Deny</button>
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
