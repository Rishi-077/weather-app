import axios from "axios";
import React, {useState, useEffect} from "react";

function SearchWeather ()
{
  const [ search, setSearch ] = useState( "london" );
  const [ data, setData ] = useState( [] );
  const [ input, setInput ] = useState( "" );
  
  let componentMounted = true;

  useEffect( () =>
  {
    fetchWeather();
  }, [] )
  
  const fetchWeather = async () =>
  {
    await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0aa8229c250d5c934ea4436242c15f0f` )
      .then( response =>
      {
        if ( componentMounted )
        {
          setData( response.data );
          console.log( response.data );
        }
        return () =>
        {
          componentMounted = false;
        }
      
      } )
    .catch( error => console.log(error) )
  }

  return ( 
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div class="card text-white text-center border-0">
              <img src="https://source.unsplash.com/600x900/?nature,water" class="card-img" alt="..." />
              <div class="card-img-overlay">
                <form>
                  <div class="input-group mb-4 w-75 mx-auto">
                    <input type="text"
                      class="form-control"
                      placeholder="search city" aria-label="search city" aria-describedby="basic-addon2" />
                    <span
                      type='submit'
                      class="input-group-text" id="basic-addon2"><i class="fa fa-search"></i></span>
                  </div>
                </form>
                  <div className="bg-dark bg-opacity-50 py-3">
                  <h2 class="card-title">{ data.name }</h2>
                    <p class="card-text lead">
                    Thursday, october 12, 2022
                    </p>
                  <hr />
                  <i className="fa fa-cloud fa-4x"></i>
                  <h1 className="fw-bolder mb-5">{data.main.temp} &deg;C</h1>
                  <p className="lead fw-bolder mb-1">Cloud</p>
                  <p className="lead">33.01&deg;C | 33.01&deg;C</p>
                  </div>
                </div>
           </div>
          </div>
        </div> 
      </div>
    </div>
   );
}

export default SearchWeather;