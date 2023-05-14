import './../All.css';
import './SignIn.css';
import logo from './../img/webstore_logo.png';

//routing
import { useNavigate } from 'react-router-dom';

//functions
import {signin} from '../services/signin';
import {signup} from '../services/signup';

export function SignIn() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/');
  };

  const goToSignUpPage = () => {
    navigate('/SignUp');
  };


  return (
    <div className="SignInPage">

        <img className="Logo" src={logo} onClick={returnHome}/>

        <button className="HomeButton" onClick={returnHome}>Home</button>

        <h2>Sign In</h2>

        <form className="Form">

          <p className="Email">Email</p>

          <input name="Email" placeholder="Enter your email"/>

          <p className="Password">Password</p>

          <input name="Password" placeholder="Enter your password"/>

          <br></br>
          <br></br>

        </form>

        <button onClick={signin}>Sign In</button>

        <div className="New"></div>

        <h3>New here? Become a customer today</h3>

        <button onClick={goToSignUpPage}> Create an account</button>

        {/*
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>
        */}

    </div>

  );
}
