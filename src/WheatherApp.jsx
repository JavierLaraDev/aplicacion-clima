import React, { useState } from 'react'

export const WheatherApp = () => {

    const urlBase = "https://api.openweathermap.org/data/2.5/weather"
    
    const API_KEY="930f231fadf6c6675fb7597d378b3a1c"

    const difKelvin = 273.15;

    const [ciudad, setCiudad] = useState("");
    const [dataClima, setDataClima] = useState()

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length>0 ) fetchClima()
    }

    const fetchClima = async () => {
        try {
            // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json();
            setDataClima(data);
        } catch (error) {
            console.error("ocurrio el siguiente problema: ", error);
        }
    }
  return (
    <div className="container">
        <h1>Aplicacion de clima</h1>
        <form action="" onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Buscar ciudad..."
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button>Buscar</button>
        </form>
        {dataClima && (
            <div>
                <h2>{dataClima.name}</h2>
                <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                <p>Condicion Meteorologica: {dataClima?.weather[0]?.description}</p>
                <img src={`https://openweathermap.org/img/wn/${dataClima?.weather[0]?.icon}@2x.png`} alt="" />
            </div>
        )}
    </div>
  )
}
