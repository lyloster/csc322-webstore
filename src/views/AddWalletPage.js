import './../All.css'
import './AddWalletPage.css'
import logo from './../img/webstore_logo.png'

//routing
import { useNavigate } from 'react-router-dom';

//functions
import { addToBalance } from '../services/addToBalance';

export function AddWalletPage() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/');
  };

  //TODO: Customer object, to get id, add id to link after implementing Customer object
  const goToProfilePage = () => {
    navigate('/customer');
  };

  return (
    <div className="AddWalletPage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="ProfileButton" onClick={goToProfilePage}>Profile</button>

        <button className="HomeButton" onClick={returnHome}>Home</button>

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

        <button onClick={ addToBalance }>Add to wallet</button>

        <p className="Denied">Cannot add money to wallet. Please try again later or contact your bank.</p>

        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

    </div>

  );
}