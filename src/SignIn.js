import './All.css'
import './SignIn.css';
import logo from './webstore_logo.png';

function SignIn() {
  return (
    <div className="SignInPage">

        <img className="Logo" src={logo}/>

        <button className="HomeButton">Home</button>

        <h2>Sign In</h2>

        <form className="Form">

          <p className="Email">Email</p>

          <input name="Email" placeholder="Enter your email"/>

          <p className="Password">Password</p>

          <input name="Password" placeholder="Enter your password"/>

          <br></br>
          <br></br>

        </form>

        <button>Sign In</button>

        <div className="New"></div>

        <h3>New here? Become a customer today</h3>

        <button>Create an account</button>

        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

    </div>

  );
}

export default SignIn;
