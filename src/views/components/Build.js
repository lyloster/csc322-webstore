import '../../All.css';
import './Build.css';


export function Build({build}) {
  return (
      <div className="Build">
        <div className="card">
        <img className="BuildImage" src={build.img}/>
        <h3>{build.name}</h3>
        <p>{build.desc}</p>
        <p>Price: ${build.price}</p>
        </div>
      </div>
  ); 
}