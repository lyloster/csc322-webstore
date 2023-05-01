import React from 'react';

//routing
import { useNavigate } from 'react-router-dom';

//functions
import { addToCart} from '../../services/addToCart';

//TODO: create a build object to generalize builds
export function Build(build){
    const navigate = useNavigate();

    const goToDetailsPage = () => {
        navigate('/details/build/:id');
    };

    return(
        <div className="Build">
            <card>
                <img className="BuildImage" src={build.image}/>
                <h3>{build.name}</h3>
                <p>{build.info}</p>
                <p>{build.price}</p>
                <button className="DetailsButton" onClick={goToDetailsPage}>View Details</button>
                <div className="Divider"></div>
                <button className="AddCartButton" onClick={addToCart}>Add to cart</button>
            </card>
        </div>)
}