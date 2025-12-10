import { useEffect, useState } from "react";

export default function WeatherWidget() {
    const [temperature, setTemperature] = useState(null);
    const [weatherCode, setWeatherCode] = useState(null);
    const [city, setCity] = useState("");

    const icons = {
        0: "☀️",
        1: "🌤️",
        2: "⛅",
        3: "☁️",
        45: "🌫️",
        48: "🌫️",
        51: "🌦️",
        61: "🌧️",
        71: "❄️",
        95: "⛈️",
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                // 1️⃣ Fetch weather
                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
                );
                const weatherData = await weatherRes.json();

                setTemperature(weatherData.current_weather.temperature);
                setWeatherCode(weatherData.current_weather.weathercode);

                // 2️⃣ Reverse geocoding → city name
                const geoRes = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                );
                const geoData = await geoRes.json();

                setCity(geoData.address.city || geoData.address.town || geoData.address.village || "");
            },
            () => {
                setCity("Unknown");
                setTemperature("?");
            }
        );
    }, []);

    if (!temperature) return null;

    return (
        <div className="weather-widget">
            <span>{city && `${city}  `}</span>
            <strong>{temperature}°C</strong>
            <span>{icons[weatherCode] || ""}</span>
        </div>
    );
}
