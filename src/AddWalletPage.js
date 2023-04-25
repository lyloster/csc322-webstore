import './All.css'
import './AddWalletPage.css'
import logo from './webstore_logo.png'

function AddWalletPage() {

  return (
    <div className="AddWalletPage">

        <img className="Logo" src={logo}/>

        <button className="ProfileButton">Profile</button>

        <button className="HomeButton">Home</button>

        <h2>Add Money to Wallet</h2>

        <form className="Form">

          <p className="BankCard">Card number</p>

          <input name="CardNumber" placeholder="Enter your card number"/>

          <p className="ExpirationDate">Expiration date</p>

          <input name="Expiration" placeholder="Enter the expiration date (MM/YY)"/>

          <p className="AddAmount">Amount</p>

          <input name="Amount" placeholder="Enter the amount to add"/>

          <br></br>
          <br></br>

        </form>

        <button>Add to wallet</button>

        <p className="Denied">Cannot add money to wallet. Please try again later or contact your bank.</p>

        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

    </div>

  );
}

export default AddWalletPage;
