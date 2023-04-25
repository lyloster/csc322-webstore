import './All.css'
import './HomePage.css';
import logo from './webstore_logo.png';
import build1 from './Build1.avif';
import build2 from './Build2.avif';
import build3 from './Build3.avif';

function HomePage() {

  return (
      <div className="HomePage">

          <img className="Logo" src={logo}/>

          <button className="CartButton">Cart</button>

          <button className="SignInButton">Sign In</button>

          <h2>Welcome Guest</h2>

          <h3 className="Gaming">Suggested Gaming PCs</h3>

          <div className="GamingPCs">

            <div className="Build1">
              <img className="BuildImage" src={build1}/>
              <h3>Player One</h3>
              <p>H5 Flow RTX 3050 Prebuilt Gaming PC</p>
              <p>Price: $3400.56</p>
              <button className="CustomizeButton">Customize</button>
              <div className="Divider"></div>
              <button className="AddCartButton">Add to cart</button>
            </div>

            <div className="Build2">
              <img className="BuildImage" src={build2}/>
              <h3>Player Two</h3>
              <p>H5 Elite RTX 3070 Prebuilt Gaming PC</p>
              <p>Price: $4012.45</p>
              <button className="CustomizeButton">Customize</button>
              <div className="Divider"></div>
              <button className="AddCartButton">Add to cart</button>
            </div>

            <div className="Build3">
              <img className="BuildImage" src={build3}/>
              <h3>Player Three</h3>
              <p>H7 Flow RTX 4070 Ti Prebuilt Gaming PC</p>
              <p>Price: $3201.37</p>
              <button className="CustomizeButton">Customize</button>
              <div className="Divider"></div>
              <button className="AddCartButton">Add to cart</button>
            </div>

          </div>

          <h3 className="Business">Suggested Business PCs</h3>

        <footer>
          <p>© 2023 A&K Custom PC</p>
        </footer>

      </div>
  );
}

export default HomePage;
