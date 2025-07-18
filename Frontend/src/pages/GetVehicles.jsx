// components/Vehicle.jsx
import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import toast from "react-hot-toast";

export default function GetVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/vehicles/available")
        const data = await response.json();
        console.log(data)
        setVehicles(data.vehicleDetails);
      } catch (err) {
        console.error("Failed to fetch vehicles", err);
        toast.error("Failed to fetch vehicles")
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <div className="p-4">Loading vehicles...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle._id} vehicle={vehicle}/>
      ))}
    </div>
  );
}
