import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';

export const signout = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    console.log("User signed out");
    //redirect to home page
    window.location.href = '/'; 
  } catch (error) {
    console.log("Error signing out:", error);
  }
};
