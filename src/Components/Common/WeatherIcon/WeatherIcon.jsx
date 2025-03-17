import "./WeatherIcon.modules.css";
import ClearDay from '../../../assets/WeatherIcon/Clear-Day.png';
import ClearNight from  '../../../assets/WeatherIcon/Clear-Night.png';
import CloudyDay from '../../../assets/WeatherIcon/Cloudy-Day.png';
import CloudyNight from '../../../assets/WeatherIcon/Cloudy-Night.png';
import Cloudy from '../../../assets/WeatherIcon/Cloudy.png';
import Fog from '../../../assets/WeatherIcon/Fog.png';
import IcePallets from '../../../assets/WeatherIcon/Ice-Pallets.png';
import Rainy from '../../../assets/WeatherIcon/Rainy.png';
import Snow from '../../../assets/WeatherIcon/Snow.png';
import ThunderStorm from '../../../assets/WeatherIcon/Thunder-Storm.png';
import Error from '../../../assets/WeatherIcon/Error.webp';

function WeatherIcon({ code }) { // Recibe code desde props
    const date = new Date();
    const time = date.getHours();

    let WeatherIconSrc;

    switch(code){
        case 1000: // Código para "Clear"
            WeatherIconSrc = time < 18 ? ClearDay : ClearNight;
            break;
        case 1003: // Código para "Partly cloudy"
            WeatherIconSrc = time < 18 ? CloudyDay : CloudyNight;
            break;
        case 1006: // Código para "Cloudy"
        case 1009: // Código para "Overcast"
            WeatherIconSrc = Cloudy;
            break;
        case 1030: // Código para "Mist"
        case 1135: // Código para "Fog"
        case 1147: // Código para "Freezing fog"
            WeatherIconSrc  = Fog;
            break;
        case 1063: // Código para "Patchy rain possible"
        case 1066: // Código para "Patchy snow possible"
        case 1069: // Código para "Patchy sleet possible"
        case 1072: // Código para "Patchy freezing drizzle possible"
        case 1150: // Código para "Patchy light drizzle"
        case 1153: // Código para "Light drizzle"
        case 1168: // Código para "Freezing drizzle"
        case 1171: // Código para "Heavy freezing drizzle"
        case 1180: // Código para "Patchy light rain"
        case 1183: // Código para "Light rain"
        case 1186: // Código para "Moderate rain at times"
        case 1189: // Código para "Moderate rain"
        case 1192: // Código para "Heavy rain at times"
        case 1195: // Código para "Heavy rain"
        case 1198: // Código para "Light freezing rain"
        case 1201: // Código para "Moderate or heavy freezing rain"
            WeatherIconSrc = Rainy;
            break;
        case 1087: // Código para "Thundery outbreaks possible"
        case 1273: // Código para "Patchy light rain with thunder"
        case 1276: // Código para "Moderate or heavy rain with thunder"
            WeatherIconSrc = ThunderStorm;
            break;
        case 1114: // Código para "Blowing snow"
        case 1117: // Código para "Blizzard"
        case 1204: // Código para "Light sleet"
        case 1207: // Código para "Moderate or heavy sleet"
        case 1210: // Código para "Patchy light snow"
        case 1213: // Código para "Light snow"
        case 1216: // Código para "Patchy moderate snow"
        case 1219: // Código para "Moderate snow"
        case 1222: // Código para "Patchy heavy snow"
        case 1225: // Código para "Heavy snow"
            WeatherIconSrc = Snow;
            break;
        case 1237: // Código para "Ice pellets"
        case 1249: // Código para "Light sleet showers"
        case 1252: // Código para "Moderate or heavy sleet showers"
        case 1255: // Código para "Light snow showers"
        case 1258: // Código para "Moderate or heavy snow showers"
        case 1261: // Código para "Light showers of ice pellets"
        case 1264: // Código para "Moderate or heavy showers of ice pellets"
            WeatherIconSrc = IcePallets;
            break;
        default:
            WeatherIconSrc = Error; 
    }

    return(
        <>
            <img src={WeatherIconSrc} alt={`Weather icon`} className={`Weather-icon ${WeatherIconSrc === Error ? "ErrorIcon" : ""}`}/>
        </>
    );
}

export default WeatherIcon;