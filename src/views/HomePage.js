import './../All.css';
import './HomePage.css';
import logo from './../img/webstore_logo.png';

import React from 'react';
import { useState, useEffect } from 'react';

//routing
import { useNavigate, useParams } from 'react-router-dom';

//components
import { Build } from './components/Build';
import { BuildsInStore } from './components/BuildsInStore';

export function HomePage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [availableBuilds, setAvailableBuilds] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  //redirect to signin
  const goToSignInPage = () => {
    navigate('/signin');
  };

  //redirect to cart
  const goToCartPage = () => {
    // create a string for all items added to cart using build ids
    const buildIds = cartItems.join('_');
    //user id is hardcoded right now
    navigate(`/cart/2/${buildIds}`);
    // navigate(`/cart/${userId}/${buildIds}`);
  };

  //build string from all build ids added to cart
  const addToCart = (id) => {
    //add items to array
    const updatedItems = [...cartItems, id];
    //concatinate to print in URL
    const buildIds = updatedItems.join('_');
    //add items to array
    setCartItems(updatedItems);
    //change URL when button is clicked
    //user id is hardcoded
    navigate(`/2/${buildIds}`);
    // navigate(`/${userId}/${buildIds}`);
  };

  //redirect to details page
  const goToDetailsPage = (id) => {
    navigate(`/details/${id}`);
  };

  //load all available builds in the store
  const allBuilds = BuildsInStore();

  useEffect(() => {
    //load array from a map
    const buildsArray = Array.from(allBuilds.values());
    //set all builds to load in the home page
    setAvailableBuilds(buildsArray);
  }, [allBuilds]);

  return (
    <div className="HomePage">
      <img className="Logo" src={logo} />

      <button className="CartButton" onClick={goToCartPage}>
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
      <footer>
        <p>© 2023 A&K Custom PC</p>
      </footer>
    </div>
  );
}
