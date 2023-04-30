import './../All.css'
import './EmployeePage.css'
import logo from './../img/webstore_logo.png'

//routing
import { useNavigate } from 'react-router-dom';

//functions
import {signout} from '../services/signout';

export function EmployeePage() {

    const navigate = useNavigate();
  
    const returnHome = () => {
      navigate('/');
    };
    
  return (
    <div className="EmployeePage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="SignOutButton" onClick={signout}>Sign Out</button>

        <button className="HomeButton" onClick={returnHome}>Home</button>

        <h2>Jie's Overview</h2>

        <div className="Sections">

          <div className="Compliments">
            <h3>Compliments</h3>
            <p>2</p>
          </div>

          <div className="Promotions">
            <h3>Promotions</h3>
            <p>1</p>
          </div>

          <div className="Warnings">
            <h3>Warnings</h3>
            <p>1</p>
          </div>

          <div className="Demotions">
            <h3>Demotions</h3>
            <p>1</p>
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

          <p>Visitor Name: Anthony Yang</p>
          <p>Visitor Email: anthonyyang48@gmail.com</p>
          <button className="ApproveButton">Approve</button>
          <button className="DenyButton">Deny</button>

        </div>

        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

    </div>

  );
}