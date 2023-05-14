import './../All.css';
import './HomePage.css';
import logo from './../img/webstore_logo.png';

import React from 'react';
import { useState, useEffect } from 'react';

//routing
import { useParams, useNavigate} from 'react-router-dom';

//components
import { Build } from './components/Build';
import { BuildsInStore } from './components/BuildsInStore';

export function HomePage() {
  const { userId, buildIds } = useParams();

  const [availableBuilds, setAvailableBuilds] = useState([]);
  const [cartItems, setCartItems] = useState();

  const navigate = useNavigate();

  //redirect to signin
  const goToSignInPage = () => {
    navigate('/signin');
  };

  //redirect to cart
  const goToCartPage = () => {
    //user id is hardcoded right now
    navigate(`/cart/2/${cartItems}`);
    // navigate(`/cart/${userId}/${buildIds}`);
  };

  //build string from all build ids added to cart
  const addToCart = (id) => {
    //add new id to the build ids string
    const updatedItems = cartItems ? `${cartItems}_${id}` : `${id}`;
    //set it as a state to persist it
    setCartItems(updatedItems);
    navigate(`/2/${updatedItems}`);
  };

  //redirect to details page
  const goToDetailsPage = (id) => {
    navigate(`/details/${id}`);
  };

  //load all available builds in the store
  const allBuilds = BuildsInStore();

  useEffect(() => {
    const buildsArray = Array.from(allBuilds.values());
    //set all builds to load in the home page
    setAvailableBuilds(buildsArray);
    setCartItems(buildIds);
  }, [allBuilds, buildIds]);

  return (
    <div className="HomePage">
      <img className="Logo" src={logo} />
      <button className="CartButton" onClick={() => goToCartPage()}>
        Cart
      </button>
      <button className="SignInButton" onClick={goToSignInPage}>
        Sign In
      </button>
      <h2>Welcome Guest</h2>
      <h3 className="Gaming">Suggested Gaming PCs</h3>
      <div className="GamingPCs">
        {availableBuilds.map((item, index) => (
          <div className="card-cart" key={index}>
            <Build build={item} />
            <button className="DetailsButton" onClick={() => goToDetailsPage(item.id)}>
              View Details
            </button>
            <div className="Divider"></div>
            <button className="AddCartButton" onClick={() => addToCart(item.id)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <h3 className="Customize">Don't see a build that you like? Customize your own!</h3>
      {/* TODO: handle forward to build page, not created yet */}
      <button className="CustomizeButton"> Customize</button>
      <h3 className="Business">Suggested Business PCs</h3>

      {/*
      <footer>
        <p>© 2023 A&K Custom PC</p>
      </footer>
      */}
      
    </div>
  );
}
