// const url = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
import axios from 'axios';

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const url = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (lat, lon) => axios.get(`${url}?lat=${lat}&lon=${lon}&e&appid=${apiKey}&units=metric`)
    .then(response => response.data);

export default { getWeather };
