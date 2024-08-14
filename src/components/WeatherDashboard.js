// src/components/WeatherDashboard.js
'use client'

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_KEY = '9b2bb7198a4d87a83fa72200233d27f4';

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatChartData = () => {
    if (!weatherData) return [];
    return weatherData.list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round(item.main.temp),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="text-center text-gray-600">Loading weather data...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {weatherData && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Weather in {weatherData.city.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Current Weather</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-gray-800">{Math.round(weatherData.list[0].main.temp)}°C</p>
                  <p className="text-gray-600 capitalize">{weatherData.list[0].weather[0].description}</p>
                </div>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  className="w-20 h-20"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-800 font-medium">Humidity</p>
                  <p className="text-gray-600">{weatherData.list[0].main.humidity}%</p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Wind Speed</p>
                  <p className="text-gray-600">{weatherData.list[0].wind.speed} m/s</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Temperature Forecast</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={formatChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}