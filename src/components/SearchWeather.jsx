import axios from "axios";
import React, {useState, useEffect} from "react";
import '../App.css'
function SearchWeather ()
{
  const [ search, setSearch ] = useState( 'london' );
  const [ data, setData ] = useState( [] );
  const [ input, setInput ] = useState( ' ' );
  
  let componentMounted = true;

  useEffect( () =>
  {
    // const fetchWeather = async () =>
    // {
    //   const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0aa8229c250d5c934ea4436242c15f0f` );
    //   if ( componentMounted )
    //   {
    //     setData( await response.json() );
    //   }
    //   return () => 
    //   {
    //     componentMounted = false;
    //   };
    // }
    fetchWeather();
  }, [search]);
  
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
        };
      
      } )
      .catch( error => console.log( error ) );
  };

  let emoji = null;
  if ( typeof data.main != 'undefined' )
  {
    if ( data.weather[ 0 ].main == 'Clouds' )
    {
      emoji = "fa-cloud";
    } else if ( data.weather[ 0 ].main == 'Thunderstorm' )
    {
      emoji = "fa-bold";
    } else if ( data.weather[ 0 ].main == 'Drizzle' )
    {
      emoji = "fa-cloud-rain";
    } else if ( data.weather[ 0 ].main == 'Rain' )
    {
      emoji = "fa-cloud-shower-heavy";
    } else if ( data.weather[ 0 ].main == 'Snow' )
    {
      emoji = "fa-snow-flake";
    } else
    {
      emoji = "fa-smog";
    }
  } else
  {
    return (
      <div>...Loading</div>
    );
  }
  
  
  //Date

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString( 'default', { month: 'long' } );
  let day = d.toLocaleString( 'default', { weekday: 'long' } );

  //Time

  let time = d.toLocaleString( [], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  } );

  // Fahrenheit to celsius
  let temp = ( data.main.temp - 273.15 ).toFixed( 2 );
  let temp_min = ( data.main.temp_min - 273.15 ).toFixed( 2 );
  let temp_max = ( data.main.temp_max - 273.15 ).toFixed( 2 );

  const handleSubmit = (event) => 
  {
    event.preventDefault();
    setSearch(input);
  }

  return (
    <div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div class="card text-white text-center border-0">
              <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} class="card-img" alt="image" />
              <div class="card-img-overlay">
                <form onSubmit = {handleSubmit}>
                  <div class="input-group mb-4 w-75 mx-auto">
                    <input type="text"
                      // class="form-control"
                      placeholder="search city" aria-label="search city" aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput( e.target.value )}
                      required
                    />
                    <button
                       type='submit'
                    // class="input-group-text"
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 class="card-title">{data.name}</h2>
                  <p class="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time} 
                  </p>
                  <hr />
                  <i className={`fa ${ emoji } fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                  <p className="lead fw-bolder mb-1">{data.weather[ 0 ].main}</p>
                  <p className="lead">{temp_min}&deg;C | {temp_max}&deg;C</p>
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