import React, { useState } from 'react';
import './weather.css';
import imgWeather from '../assets/ArtWeather.png';
import Moment from 'react-moment';
import 'moment-timezone';

const API = {
    key:"f7b0f3320abbc7dc0afdbbe8113c4f44",
    base: "https://api.openweathermap.org/data/2.5/"
} 

function WeatherApp() {
    const today = new Date();
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = searchEvent =>{
        if(searchEvent.key === "Enter"){
            fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
                .then(response => response.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                }); 
        }
    }

    return (
        <div className="container-fluid">
    
            <div className="img-cont">
                <img alt="img" src={imgWeather} className="img-fluid" width="100%"/>
                <h2 className="centered">WEATHER 2020</h2>
            </div>
            
            <div className="container">
                <div className="input-group mb-1 py-5">
                    <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fas fa-search"></i></div>
                    </div>
                    <input type="text" className="form-control" placeholder="Search here" aria-label="Search" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
                </div>
            </div>
            
            {(typeof weather.main !="undefined")? (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-5">
                            <div className="card-body">
                                
                                <h3 className="card-title font-weight-bold">{weather.name}, {weather.sys.country}</h3>
                                
                                <p className="card-text"><Moment format="MMMM DD, YYYY">{today}</Moment></p>
                                
                                <div className="row mb-4 styleWeather">
                                    <div className="col-md-7">
                                        <h3 className="display-3">{weather.main.temp}°C</h3>
                                    </div>
                                    <div className="col-md-5 text-center">
                                        <i className={
                                            (typeof weather.main !='undefined')?
                                            ((weather.weather[0].main==='Clear')?
                                            'fas fa-8x fa-sun':
                                            (weather.weather[0].main==='Clouds')?
                                            'fas fa-8x fa-cloud':
                                            (weather.weather[0].main==='Snow')?
                                            'fas fa-8x fa-snowflake':
                                            (weather.weather[0].main==='Thunderstorm')?
                                            'fas fa-8x fa-bolt':
                                            (weather.weather[0].main==='Rain')?
                                            'fas fa-8x fa-cloud-showers-heavy':'fas fa-8x fa-cloud'):''}>
                                        </i>
                                    </div>
                                    <div className="col-md-12 weahr">
                                        <hr/>
                                        <h3 className="display-4">{weather.weather[0].main}</h3>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6 text-center">
                                        <h5><i className="fas fa-tint fa-lg text-info pr-2"></i>{weather.main.humidity}% Humidity</h5>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <h5><i className="fas fa-leaf fa-lg grey-text pr-2"></i>{weather.wind.speed} Winds</h5>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th colSpan="2" className="text-center">More information of the weather</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Time</th>
                                <td><Moment format="HH:mm a">{today}</Moment></td>
                            </tr>
                            <tr>
                                <th scope="row">Latitude</th>
                                <td>{weather.coord.lat}</td>
                            </tr>
                            <tr>
                                <th scope="row">Longitude</th>
                                <td>{weather.coord.lon}</td>
                            </tr>
                            <tr>
                                <th scope="row">Feels like</th>
                                <td>{weather.main.feels_like}°C</td>
                            </tr>
                            <tr>
                                <th scope="row">Temperature Minimum</th>
                                <td>{weather.main.temp_min}°C</td>
                            </tr>
                            <tr>
                                <th scope="row">Temperature Maximum</th>
                                <td>{weather.main.temp_max}°C</td>
                            </tr>
                            <tr>
                                <th scope="row">Clouds</th>
                                <td>{weather.clouds.all} %</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            
            </div>):('')}

        </div>
    )
}

export default WeatherApp;

