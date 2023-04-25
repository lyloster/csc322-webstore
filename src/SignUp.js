import './All.css'
import './SignUp.css';
import logo from './webstore_logo.png';

function SignUp() {
  return (
    <div className="SignUpPage">

        <img className="Logo" src={logo}/>

        <button className="HomeButton">Home</button>

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

        <button>Sign Up</button>

        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

    </div>

  );
}

export default SignUp;
