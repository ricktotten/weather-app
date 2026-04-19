# Weather App 🌤️

A simple vanilla JavaScript weather app that lets users search for a city and view current weather conditions.

## Features

✅ Search for any city in the world  
✅ Display current temperature, weather conditions, humidity, and wind speed  
✅ Toggle between Celsius and Fahrenheit  
✅ Responsive design (works on mobile & desktop)  
✅ Clean, modern UI with smooth animations  

## Setup Instructions

### 1. Get an OpenWeatherMap API Key

1. Visit [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account (no credit card required)
3. Go to your API keys section
4. Copy your API key (usually takes a few minutes to activate)

### 2. Configure the App

1. Copy `.env.example` to `.env`
2. Open `.env` and replace `your_api_key_here` with your actual OpenWeatherMap API key

**Example:**
```
API_KEY=abcd1234efgh5678ijkl9012mnop3456
```

### 3. Run the App

```bash
npm install
npm start
```

Then open your browser to: `http://localhost:3000`

## How to Use

1. Enter a city name (e.g., "London", "New York", "Tokyo")
2. Click the "Search" button or press Enter
3. View the current weather for that city
4. Toggle between °C and °F using the buttons at the top
5. Search for a different city anytime

## Files

- `index.html` — Main HTML structure
- `styles.css` — Styling and responsive layout
- `app.js` — Core JavaScript logic (search, API calls, temperature conversion)
- `server.js` — Local server that injects environment variables
- `.env` — API key (not committed to git)
- `.env.example` — Template for environment configuration
- `.gitignore` — Prevents `.env` from being committed to Git

## Testing

### Test Cases
✓ **Valid city**: Search "London" → Weather displays  
✓ **Invalid city**: Search "XyzNotACity" → Error message displays  
✓ **Unit toggle**: Click °F button → Temperature converts  
✓ **Empty search**: Click search with empty field → No API call made  
✓ **Keyboard**: Press Enter in search box → Search executes  

## Troubleshooting

**Q: "API_KEY not configured" warning in console**  
A: You haven't added your API key to `.env` yet. See Setup Instructions above.

**Q: City not found error**  
A: Check the spelling. Try "London, UK" or just "London". The API accepts city names and country codes.

**Q: CORS error in browser console**  
A: OpenWeatherMap API doesn't have CORS headers. Make sure you're:
   - Using an API key (not accessing the API directly)
   - Calling from `localhost` or a deployed domain
   - Not making direct browser requests without a server proxy

**Q: Request limit reached**  
A: Free tier has 1,000 calls/day. Wait 24 hours or upgrade your account.

## Future Enhancements

- 5-day weather forecast
- Search history / saved favorites  
- Geolocation (auto-detect user's location)
- Weather alerts
- Multiple units (pressure, visibility, UV index)

## License

MIT - Feel free to use and modify!!!

Hello.