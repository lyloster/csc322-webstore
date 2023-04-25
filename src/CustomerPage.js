import './All.css'
import './CustomerPage.css'
import logo from './webstore_logo.png'

function CustomerPage() {
  return (
    <div className="CustomerPage">

        <img className="Logo" src={logo}/>

        <button className="CartButton">Cart</button>

        <button className="SignOutButton">Sign Out</button>

        <button className="HomeButton">Home</button>

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

export default CustomerPage;
