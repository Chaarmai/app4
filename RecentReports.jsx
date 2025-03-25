import { useState, useEffect } from "react"; import { Loader } from "@googlemaps/js-api-loader";
export default function RecentReports() {
  const [zip, setZip] = useState(""); const [weatherData, setWeatherData] = useState([]);
  const [map, setMap] = useState(null); const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const loader = new Loader({ apiKey: "AIzaSyBMYMUD0d_gVXSJHbThDnq5nAh9wXP1rB8", version: "weekly" });
    loader.load().then(() => {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.8283, lng: -98.5795 }, zoom: 4,
        styles: [{ elementType: "geometry", stylers: [{ color: "#1e1e1e" }] }]
      }); setMap(mapInstance);
    });
  }, []);
  const fetchReports = () => {
    fetch(`https://weather-backend-dusky.vercel.app/api/weather-alerts?zip=${zip}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data); if (map) {
          markers.forEach(marker => marker.setMap(null));
          const newMarkers = data.map(event => new window.google.maps.Marker({
            position: { lat: event.latitude, lng: event.longitude }, map,
            title: `${event.zipCode} - ${event.description}`,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE, scale: 8,
              fillColor: event.severity === 'High' ? 'red' : event.severity === 'Medium' ? 'orange' : 'yellow',
              fillOpacity: 0.8, strokeWeight: 0,
            }
          })); setMarkers(newMarkers);
          if (data.length > 0) {
            map.setCenter({ lat: data[0].latitude, lng: data[0].longitude }); map.setZoom(10);
          }
        }
      });
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Recent Storm Reports</h2>
      <div className="flex mb-4 gap-2">
        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Enter ZIP code"
          className="p-2 bg-[#334155] text-white rounded" />
        <button onClick={fetchReports} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Search</button>
      </div>
      <div id="map" className="w-full" style={{ height: '60vh' }}></div>
      <div className="mt-4 space-y-2">
        {weatherData.map((event, idx) => (
          <div key={idx} className="bg-[#1e293b] p-4 rounded">
            <strong>{event.zipCode}</strong> - {event.description} (Severity: <span className="text-yellow-300">{event.severity}</span>)
          </div>
        ))}
      </div>
    </div>
  );
}