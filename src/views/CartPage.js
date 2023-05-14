import './../All.css';
import './CartPage.css';
import logo from './../img/webstore_logo.png';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Build } from './components/Build';
import { BuildsInStore} from './components/BuildsInStore';

import { getBuildById } from '../services/getBuildById';
import { subtractFromWallet} from '../services/subtractFromWallet.js';

export function CartPage() {
  const [userName, setUsername] = useState('');
  const [items, setItems] = useState([]);
  const { userIds, buildIds } = useParams();
  const [total, setTotal] = useState(0);
  const [isEmptyCart, setIsEmptyCart] = useState(false);

  //load map with all builds
  const allBuilds = BuildsInStore();

  useEffect(() => {
    //check if cart is empty
    if (buildIds === undefined) {
        setIsEmptyCart(true);
        return;
      }
    //split build ids from the url
    const buildIdsArray = buildIds.split('_');

    let totalPrice = 0;
    const addedItems = [];

    for (const id of buildIdsArray) {
        //get build info by id
        const item = getBuildById(allBuilds, id);
        if (item) {
            console.log(item);
            totalPrice += item.price;
          } else {
            console.log('Item not found');
          }
          //add build to array of Added to cart builds
          addedItems.push(item);
    }
    //set state to use Builds in the return statement
    setItems(addedItems);
    setTotal(totalPrice.toFixed(2));
    setIsEmptyCart(false);

  }, [allBuilds, buildIds]);

  if (isEmptyCart) {
    return (
      <div className="CartPage">
        <img className="Logo" src={logo} />
        <h2> Your cart</h2>
        <div>
          <h3>Cart is Empty &#x2639;</h3>
        </div>
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>
      </div>
    );
  }

  return (
      <div className="CartPage">
        <img className="Logo" src={logo}/>
        <h2> Your cart</h2>

        <div> {
        items.map((item, index) => {
                return (
                <div className="card-cart" key={index}>
                    <Build
                        build={item}
                    /> 
                </div>
                )
            })
        }

        <div className='total'>Total: ${total}</div>
        <button className="checkout" onClick={() => subtractFromWallet(total)}>Checkout</button>
        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

      </div>
    </div>
  ); 
}