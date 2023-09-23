import React, { useEffect, useState } from "react";

function Weather() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("London");

  const fetchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=b16de29f75d99da9018d6df9d4a0c49d&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  };

  useEffect(() => {
    fetchData();
  }, [country]);

  return (
    <div>
      <input
        placeholder="Enter country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button onClick={fetchData}>Get Weather</button>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
}

export default Weather;
