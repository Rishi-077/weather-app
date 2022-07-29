import axios from "axios";
import React, {useState, useEffect} from "react";
import '../App.css'
function SearchWeather ()
{
  const [ search, setSearch ] = useState( 'new york' );
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
      emoji = "fa-cloud-drizzle";
    } else if ( data.weather[ 0 ].main == 'Rain' )
    {
      emoji = "fa-cloud-showers-heavy";
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
      <div class="text-center justify-center">
         <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
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
      <div className="container mt-4">
        <h1 className="h1-header">Weather app</h1>
        <div className="row justify-content-center">
          <div className="col-xl-5">
            <div class="card text-white text-center border-none">
              <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} class="card-img" alt="..." />
              <div class="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div class="input-group mb-3 mt-2 w-75 mx-auto">
                    <input
                      type="text"
                      class="form-control py-2"
                      placeholder="search your city" aria-label="search city" aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput( e.target.value )}
                      required
                    />
                    <button
                      class="input-group-text"
                       type='submit'
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-2">
                  <h2 class="card-title">{data.name}</h2>
                   <h3 className="card-title">{ data.sys.country }</h3>
                  <p class="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time} 
                  </p>
                  <hr />
                  <i className={`fa ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-3">{temp} &deg;C</h1>
                  <p className="lead fw-bolder mb-1">{data.weather[ 0 ].main}</p>
                  <p className="lead">{temp_min}&deg;C | {temp_max}&deg;C</p>
                  <p className="lead">Wind Speed - { data.wind.speed } Km/h</p>

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