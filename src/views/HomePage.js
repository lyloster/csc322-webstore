import './../All.css'
import './HomePage.css';
import logo from './../img/webstore_logo.png';
import build1 from './../img/Build1.avif';
import build2 from './../img/Build2.avif';
import build3 from './../img/Build3.avif';
import React from 'react';

//routing
import { useNavigate } from 'react-router-dom';

//components
// TODO: use generalized build
// import { Build } from './components/Build';

export function HomePage() {
  const navigate = useNavigate();

  const goToSignInPage = () => {
    navigate('/signin');
  };

  const goToCartPage = () => {
    navigate('/cart');
  };

  return (
      <div className="HomePage">

          <img className="Logo" src={logo}/>

          <button className="CartButton" onClick={goToCartPage}>Cart</button>

          <button className="SignInButton" onClick={goToSignInPage}>Sign In</button>

          <h2>Welcome Guest</h2>

          <h3 className="Gaming">Suggested Gaming PCs</h3>

          <div className="GamingPCs">
            {/* Routing for each component done in generalized Build component */}
            <div className="Build1">
              <img className="BuildImage" src={build1}/>
              <h3>Player One</h3>
              <p>H5 Flow RTX 3050 Prebuilt Gaming PC</p>
              <p>Price: $3400.56</p>
              <button className="DetailsButton">View Details</button>
              <div className="Divider"></div>
              <button className="AddCartButton">Add to cart</button>
            </div>

            <div className="Build2">
              <img className="BuildImage" src={build2}/>
              <h3>Player Two</h3>
              <p>H5 Elite RTX 3070 Prebuilt Gaming PC</p>
              <p>Price: $4012.45</p>
              <button className="DetailsButton">View Details</button>
              <div className="Divider"></div>
              <button className="AddCartButton">Add to cart</button>
            </div>

            <div className="Build3">
              <img className="BuildImage" src={build3}/>
              <h3>Player Three</h3>
              <p>H7 Flow RTX 4070 Ti Prebuilt Gaming PC</p>
              <p>Price: $3201.37</p>
              <button className="DetailsButton">View Details</button>
              <div className="Divider"></div>
              <button className="AddCartButton">Add to cart</button>
            </div>

          </div>

          {/* TODO: decide on Customize */}
          <h3 className="Customize">Don't see a build that you like? Customize your own!</h3>
          {/* TODO: handle forward to build page, not created yet */}
          <button className="CustomizeButton"> Customize</button>

          <h3 className="Business">Suggested Business PCs</h3>

        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

      </div>
  );
}