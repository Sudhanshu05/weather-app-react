import React, { useState } from 'react';

function App() {
    const api = {
        key: 'cba43a61f3825df3be3f4c1903023de3',
        base: 'https://api.openweathermap.org/data/2.5/',
    };

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const search = evt => {
        if (evt.key === 'Enter' && query) {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    if (!result.message) {
                        setWeather(result);
                        setError(null);
                        setQuery('');
                        return;
                    } else {
                        setError(result);
                        setWeather(null);
                        setQuery('');
                    }
                });
        }
    };

    const dateBuilder = d => {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div className={weather && weather.main.temp > 16 ? 'app warm' : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search ...."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    ></input>
                </div>
                {weather && weather.main ? (
                    <div>
                        <div className="location-box">
                            <div className="location">
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className="date">
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : (
                    error && <div className="error-msg">{error.message} </div>
                )}
            </main>
        </div>
    );
}

export default App;
