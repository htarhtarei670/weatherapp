import React from 'react'
import clear from "../../asset/Images/clear.png"
import cloud from "../../asset/Images/cloud.png"
import drizzle from "../../asset/Images/drizzle.png"
import humidity from "../../asset/Images/humidity.png"
import rain from "../../asset/Images/rain.png"
import snow from "../../asset/Images/snow.png"
import wind from "../../asset/Images/wind.png"
import search from "../../asset/Images/search.png"
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import moment from 'moment/moment'

const Weather = () => {
    const [weathers, setWeathers] = useState('')
    const [search, setSearch] = useState('Yangon')
    const [input, setInput] = useState('')
    
    //get data from api key
    useEffect(() => {
        const weatherData = () => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=dcbc79f067a70e778e1ebb19801fed36`)
             .then((res)=>setWeathers(res.data))
            .catch((err)=>console.log(err))
        }
        weatherData();
    }, [search])
    
    console.log(weathers);
    //submit handler
    const submitHandler = (e) => {
        e.preventDefault();
       setSearch(input);
    }

//for time zone
    const day=moment().format('dddd');
    const date = moment().format('LL');
    const time=moment().format('LT');
 
//weather icon dynamic
    const icons = weathers.weather[0].main;
    let weatherImg = "";

switch (icons) {
        case "Clouds":
            weatherImg=<img src={cloud} alt="cloud" className='cloud'/>
            break;
        case "Rain":
            weatherImg=<img src={rain} alt="cloud" className='cloud'/>
            break;
        case "Drizzle":
            weatherImg=<img src={drizzle} alt="cloud" className='cloud'/>
            break;
        case "Snow":
        weatherImg = <img src={snow} alt="cloud" className='cloud'/>
            break;
    default:
        weatherImg = <img src={clear} alt="cloud" className='cloud'/>
            break;
   }
    
// console.log(weathers.main.humidity);
    // console.log(weathers.wind.speed);

  return (
      <div className="container d-flex justify-content-center pt-5
    ">
          <div class="card text-bg-dark text-center">
            <img src={`https://source.unsplash.com/600x900/?${weathers.weather[0].main}`} class="card-img" alt="..." />
              <div class="card-img-overlay">
                    <form class="input-group mb-3 px-3" onSubmit={submitHandler}>
                         <input type="search"
                              class="form-control"
                              placeholder="Enter location.."
                              aria-label="Enter location..."
                              aria-describedby="button-addon2"
                              onChange={(e)=>setInput(e.target.value) } 
                            />
                             <button class="btn btn-primary" type="submit" id="button-addon2">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                    </form>
                <div className="bg-dark bg-opacity-50 opacity my-5 mx-3">
                      <h1>{weathers.name}</h1>
                      <div className='time-zone fs-6'>
                          <div className='date'>
                              {day},{date}
                          </div>
                          <div className="time pt-2">
                              {time}
                          </div>
                      </div>
                      <hr />
                      <div className='weather-show'>
                          {weatherImg }
                          <h4 className='degree'>13<span>&deg;C</span></h4>
                          <div className="d-flex px-4 pt-5 justify-content-between">
                              <div className='d-flex'>
                                  <img src={humidity} alt="humidity"/>
                                  <div className='wind'>
                                      <h3>{weathers.main.humidity }%</h3>
                                      <p>Humidity</p>
                                  </div>
                              </div>
                              <div className="d-flex">
                                  <img src={wind} alt="wind" />
                                  <div className='wind'>
                                      <h3>{weathers.wind.speed }km/h</h3>
                                      <p>Wind Speed</p>
                                  </div>
                              </div>
                          </div>
                      </div>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
