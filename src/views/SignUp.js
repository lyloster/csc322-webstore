import './../All.css'
import './SignUp.css';
import logo from './../img/webstore_logo.png';

//routing
import { useNavigate } from 'react-router-dom';

export function SignUp() {

  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/');
  };

  return (
    <div className="SignUpPage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="HomeButton" onClick={returnHome}>Home</button>

        <h2>Create Account</h2>

        <p className="FirstName">First Name</p>

        <input name="FirstName" placeholder="Enter your first name"/>

        <p className="LastName">Last Name</p>

        <input name="Last Name" placeholder="Enter your last name"/>

        <p className="Email">Email</p>

        <input name="Email" placeholder="Enter your email"/>

        <p className="Password">Password</p>

        <input name="Password" placeholder="Enter your password"/>

        <br></br>
        {/* TODO: button is not visible? */}
        <button>Sign Up</button>

        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

    </div>

  );
}