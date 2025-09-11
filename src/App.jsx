import { useState } from "react";
import "./App.css";

function App() {
  // State for all 12 inputs
  const [area, setArea] = useState("7420");
  const [bedrooms, setBedrooms] = useState("4");
  const [bathrooms, setBathrooms] = useState("2");
  const [stories, setStories] = useState("2");
  const [mainroad, setMainroad] = useState("Yes");
  const [guestroom, setGuestroom] = useState("No");
  const [basement, setBasement] = useState("No");
  const [hotwaterheating, setHotwaterheating] = useState("No");
  const [airconditioning, setAirconditioning] = useState("Yes");
  const [parking, setParking] = useState("2");
  const [prefarea, setPrefarea] = useState("No");
  const [furnishingstatus, setFurnishingstatus] = useState("Furnished");

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction("Loading...");
    setError(null);

    const dataToSend = {
      area: parseFloat(area),
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      stories: parseInt(stories),
      mainroad,
      guestroom,
      basement,
      hotwaterheating,
      airconditioning,
      parking: parseInt(parking),
      prefarea,
      furnishingstatus,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/predict`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );
      const result = await response.json();
      if (result.error) {
        setError(result.error);
        setPrediction(null);
      } else {
        setPrediction(result.prediction);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      setPrediction(null);
    }
  };
  console.log("API URL:", process.env.REACT_APP_API_URL);
  return (
    <div className="container">
      <h1>🏠 Housing Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Area (sq ft)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Bathrooms"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stories"
          value={stories}
          onChange={(e) => setStories(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Parking Spaces"
          value={parking}
          onChange={(e) => setParking(e.target.value)}
          required
        />

        <select value={mainroad} onChange={(e) => setMainroad(e.target.value)}>
          <option value="Yes">Main Road</option>
          <option value="No">No Main Road</option>
        </select>

        <select value={guestroom} onChange={(e) => setGuestroom(e.target.value)}>
          <option value="Yes">Guest Room</option>
          <option value="No">No Guest Room</option>
        </select>

        <select value={basement} onChange={(e) => setBasement(e.target.value)}>
          <option value="Yes">Basement</option>
          <option value="No">No Basement</option>
        </select>

        <select value={hotwaterheating} onChange={(e) => setHotwaterheating(e.target.value)}>
          <option value="Yes">Hot Water</option>
          <option value="No">No Hot Water</option>
        </select>

        <select value={airconditioning} onChange={(e) => setAirconditioning(e.target.value)}>
          <option value="Yes">AC</option>
          <option value="No">No AC</option>
        </select>

        <select value={prefarea} onChange={(e) => setPrefarea(e.target.value)}>
          <option value="Yes">Preferred Area</option>
          <option value="No">Not Preferred</option>
        </select>

        <select value={furnishingstatus} onChange={(e) => setFurnishingstatus(e.target.value)}>
          <option value="Furnished">Furnished</option>
          <option value="Semi-furnished">Semi-furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>

        <button type="submit">🔮 Predict Price</button>
      </form>

      {prediction && (
        <div className="result">
          <h2>Predicted Price: {prediction}</h2>
        </div>
      )}
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
