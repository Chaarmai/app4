import { useEffect } from "react"; import { Loader } from "@googlemaps/js-api-loader";
export default function Dashboard() {
  useEffect(() => {
    const loader = new Loader({ apiKey: "AIzaSyBMYMUD0d_gVXSJHbThDnq5nAh9wXP1rB8", version: "weekly" });
    loader.load().then(() => {
      new window.google.maps.Map(document.getElementById("dashboard-map"), {
        center: { lat: 39.8283, lng: -98.5795 }, zoom: 4,
        styles: [{ elementType: "geometry", stylers: [{ color: "#1e1e1e" }] }]
      });
    });
  }, []);
  return <div className="p-6"><h2 className="text-xl font-bold mb-4">Dashboard Overview</h2><div id="dashboard-map" className="w-full rounded" style={{ height: '70vh' }}></div></div>;
}