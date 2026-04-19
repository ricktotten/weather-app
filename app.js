// Weather App - Main Application Logic

// Configuration - injected by server from .env file
const CONFIG = {
    API_KEY: 'YOUR_API_KEY_HERE',
    BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
    UNITS: 'metric'
};

class WeatherApp {
    constructor() {
        // DOM Elements
        this.searchForm = document.getElementById('searchForm');
        this.cityInput = document.getElementById('cityInput');
        this.weatherCard = document.getElementById('weatherCard');
        this.errorContainer = document.getElementById('errorContainer');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        
        // Weather display elements
        this.cityName = document.getElementById('cityName');
        this.temperature = document.getElementById('temperature');
        this.condition = document.getElementById('condition');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        
        // Unit toggle buttons
        this.celsiusBtn = document.getElementById('celsiusBtn');
        this.fahrenheitBtn = document.getElementById('fahrenheitBtn');
        
        // State
        this.currentTemp = null; // Store in Kelvin for conversions
        this.currentUnit = 'C'; // Default to Celsius
        this.currentWeatherData = null;
        
        // Initialize event listeners
        this.init();
    }
    
    init() {
        // Form submission
        this.searchForm.addEventListener('submit', (e) => this.handleSearch(e));
        
        // Unit toggle buttons
        this.celsiusBtn.addEventListener('click', () => this.setUnit('C'));
        this.fahrenheitBtn.addEventListener('click', () => this.setUnit('F'));
    }
    
    handleSearch(e) {
        e.preventDefault();
        
        const city = this.cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }
        
        this.searchWeather(city);
    }
    
    async searchWeather(city) {
        try {
            // Show loading state
            this.showLoading();
            this.clearError();
            
            // Build API URL
            const url = `${CONFIG.BASE_URL}?q=${encodeURIComponent(city)}&appid=${CONFIG.API_KEY}&units=metric`;
            
            // Fetch weather data
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
                } else if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your .env file.');
                } else {
                    throw new Error(`API error: ${response.status}`);
                }
            }
            
            const data = await response.json();
            
            // Store weather data and convert temp to Kelvin for internal storage
            this.currentWeatherData = data;
            this.currentTemp = data.main.temp + 273.15; // Convert Celsius to Kelvin
            
            // Display the weather
            this.displayWeather(data);
            
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    displayWeather(data) {
        // Extract data
        const city = `${data.name}, ${data.sys.country}`;
        const tempCelsius = data.main.temp;
        const description = data.weather[0].main;
        const humidityPercent = data.main.humidity;
        const windSpeedMs = data.wind.speed;
        
        // Update city name
        this.cityName.textContent = city;
        
        // Update temperature (will be formatted based on current unit)
        this.updateTemperatureDisplay();
        
        // Update condition
        this.condition.textContent = description;
        
        // Update humidity
        this.humidity.textContent = `${humidityPercent}%`;
        
        // Update wind speed (convert m/s to km/h for display)
        const windSpeedKmh = (windSpeedMs * 3.6).toFixed(1);
        this.windSpeed.textContent = `${windSpeedKmh} km/h`;
        
        // Show weather card
        this.weatherCard.classList.remove('hidden');
    }
    
    setUnit(unit) {
        if (this.currentUnit === unit) return;
        
        this.currentUnit = unit;
        
        // Update button states
        if (unit === 'C') {
            this.celsiusBtn.classList.add('active');
            this.fahrenheitBtn.classList.remove('active');
        } else {
            this.fahrenheitBtn.classList.add('active');
            this.celsiusBtn.classList.remove('active');
        }
        
        // Update temperature display
        this.updateTemperatureDisplay();
    }
    
    updateTemperatureDisplay() {
        if (this.currentTemp === null) return;
        
        let temp;
        let unit;
        
        if (this.currentUnit === 'C') {
            // Convert Kelvin to Celsius
            temp = this.currentTemp - 273.15;
            unit = '°C';
        } else {
            // Convert Kelvin to Fahrenheit
            temp = (this.currentTemp - 273.15) * (9 / 5) + 32;
            unit = '°F';
        }
        
        // Round to 1 decimal place
        temp = temp.toFixed(1);
        
        this.temperature.textContent = `${temp}${unit}`;
    }
    
    showLoading() {
        this.loadingSpinner.classList.remove('hidden');
    }
    
    hideLoading() {
        this.loadingSpinner.classList.add('hidden');
    }
    
    showError(message) {
        this.errorContainer.textContent = message;
        this.errorContainer.classList.remove('error-hidden');
        this.weatherCard.classList.add('hidden');
    }
    
    clearError() {
        this.errorContainer.textContent = '';
        this.errorContainer.classList.add('error-hidden');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new WeatherApp();
    console.log('Weather App initialized');
});
