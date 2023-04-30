import './../All.css'
import './CustomerPage.css'
import logo from './../img/webstore_logo.png'

//routing
import { useNavigate } from 'react-router-dom';

//functions
import { signout } from '../services/signout';

export function CustomerPage() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/');
  };

  const goToCartPage = () => {
    navigate('/cart');
  };

  return (
    <div className="CustomerPage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="CartButton" onClick={goToCartPage}>Cart</button>

        <button className="SignOutButton" onClick={signout}>Sign Out</button>

        <button className="HomeButton" onClick={returnHome}>Home</button>

        <h2>Anthony's Overview</h2>

        <div className="Sections">

          <div className="Compliments">
            <h3>Compliments</h3>
            <p>1</p>
          </div>

          <div className="Warnings">
            <h3>Warnings</h3>
            <p>2</p>
          </div>

          <div className="Wallet">
            <h3>Wallet</h3>
            <p>$20.23</p>
            <button className="AddButton">+</button>
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

        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

    </div>

  );
}