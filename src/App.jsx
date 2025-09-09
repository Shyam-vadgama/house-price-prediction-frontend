import { useState } from "react";
import "./App.css";

function App() {
  const [rooms, setRooms] = useState("");
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://house-price-prediction-backend-145o.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rooms: parseInt(rooms), // Make sure to send numbers
        area: parseFloat(area),   // Make sure to send numbers
        location: location
      }),
    });
    const data = await response.json();
    
    // YEH LINE ADD KARO
    console.log("SERVER SE YEH RESPONSE AAYA:", data);
    
    setPrediction(data.prediction);
  };

  return (
    <div className="container">
      <h1>🏠 Housing Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Number of rooms"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Area (sq ft)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && (
  <div className="result">
    <h2>Predicted Price: ${prediction}</h2>
  </div>
)}
    </div>
  );
}

export default App;
