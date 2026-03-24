 const apiKey = "41d84fab69230c719be0fa28de2461ec";

    const form = document.getElementById("searchForm");
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const weatherIcon = document.getElementById("weatherIcon");

    const historyTable = document.getElementById("historyTable");

    window.onload = () => {
      const savedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
      savedHistory.forEach(cityData => addHistoryRow(cityData));

      if (savedHistory.length) fetchWeather(savedHistory[0].name);
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const city = cityInput.value.trim();
      if (city) fetchWeather(city);
    });

    async function fetchWeather(city) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        weatherResult.style.display = "block";

        const cityData = {
          name: data.name,
          temp: data.main.temp,
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          wind: data.wind.speed
        };

        cityName.textContent = `${cityData.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(cityData.temp)} °C`;
        description.textContent = data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase());
        humidity.textContent = cityData.humidity;
        wind.textContent = cityData.wind;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        addHistoryRow(cityData);
        saveHistory(cityData);

        cityInput.value = '';
      } catch (err) {
        alert("Could not fetch weather. Please check the city name or API key.");
        console.error(err);
      }
    }

    function addHistoryRow(cityData) {
      const rows = Array.from(historyTable.rows);
      rows.forEach(row => {
        if (row.cells[0].textContent === cityData.name) row.remove();
      });

      const row = `<tr>
        <td>${cityData.name}</td>
        <td>${Math.round(cityData.temp)}</td>
        <td>${cityData.condition}</td>
        <td>${cityData.humidity}</td>
        <td>${cityData.wind}</td>
      </tr>`;
      historyTable.innerHTML = row + historyTable.innerHTML;
    }

    function saveHistory(cityData) {
      let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
      history = history.filter(item => item.name !== cityData.name);
      history.unshift(cityData);
      if (history.length > 10) history.pop();
      localStorage.setItem("weatherHistory", JSON.stringify(history));
    }
