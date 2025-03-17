import React, { useEffect, useState } from 'react';
import { getCurrentWeather, getForecast } from './Services/api';
import SideBar from './Components/SideBar/SideBar';
import WeeklyForecast from './Components/WeeklyForecast/WeeklyForecast';
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';

function App() {
    return (
        <div className="grid grid-cols-[7rem,1fr,15rem] h-screen">
            {/* SideBar izquierda */}
            <SideBar />

            {/* Contenido principal */}
            <main className="col-start-2 col-end-3 p-4 overflow-y-auto">
                <WeatherInfo />
            </main>

            {/* SideBar derecha */}
            <WeeklyForecast location="São Paulo" />
        </div>
    );
}

export default App;