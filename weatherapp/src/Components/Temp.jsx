import React, {useEffect, useState} from "react";
import "./App.css";
import WeatherDescription from "./weatherDescription";

function Temp() {

    const [searchVal, setSearchVal] = useState("kolkata");
    const [temparatureInfo, setTemparatureInfo] = useState({});

    async function getWeatherInfo() {
        try {
            const apiKey = "b738b29cd3cbf2ad2109641d22ddb661";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=metric&appid=${apiKey}`;

            const res = await fetch(apiUrl);
            const data = await res.json();           

            const { humidity, temp, pressure } = data.main;
            const { main:weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;
            
            
            const myWeatherInfo = {
                temp,
                humidity, 
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTemparatureInfo(myWeatherInfo);

            // console.log(data);
        }
        catch(e) {
            console.log(e);
        }
    }


    useEffect(() => {
        getWeatherInfo();
    }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
            <input 
                type="text"
                placeholder="search"
                className="searchTerm"
                spellCheck="false"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
            />

            <button 
                className="searchButton"
                onClick={getWeatherInfo}
            >
                search
            </button>
        </div>
      </div>

       <WeatherDescription temparatureInfo={temparatureInfo}/>
      
    </>
  )
}

export default Temp;
