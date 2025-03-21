import React from 'react';
import SideBar from './Components/SideBar/SideBar';
import WeeklyForecast from './Components/WeeklyForecast/WeeklyForecast';
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';
import DailyForecast from './Components/DailyForecast/DailyForecast';

function App() {
    return (
        <div className="grid grid-cols-[7rem_1fr_500px] grid-rows-[1fr_auto] h-screen min-w-[calc(7rem+500px+100px)] gap-x-4 gap-y-4">
            {/* Sidebar izquierdo - Ocupa ambas filas */}
            <div className="row-span-2 min-w-[7rem] pr-2">
                <SideBar />
            </div>

            {/* Contenido principal */}
            <div className="col-start-2 row-start-1 p-4 pb-0 overflow-y-auto">
                <WeatherInfo />
            </div>

            {/* DailyForecast al fondo */}
            <div className="col-start-2 row-start-2 pt-0">
                <DailyForecast />
            </div>

            {/* Sidebar derecho - Ocupa ambas filas */}
            <div className="col-start-3 row-span-2 p-4 overflow-y-auto min-w-[500px] pl-4">
                <WeeklyForecast location="São Paulo" />
            </div>
        </div>
    );
}

export default App;