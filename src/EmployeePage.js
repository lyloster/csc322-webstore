import './All.css'
import './EmployeePage.css'
import logo from './webstore_logo.png'

function EmployeePage() {

  return (
    <div className="EmployeePage">

        <img className="Logo" src={logo}/>

        <button className="SignOutButton">Sign Out</button>

        <button className="HomeButton">Home</button>

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

export default EmployeePage;
