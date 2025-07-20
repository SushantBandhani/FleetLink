// components/Vehicle.jsx
import { useState } from "react";
import VehicleCard from "../components/VehicleCard";
import FormSearchComponent from "../components/FormSearchComponent";

export default function GetVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    capacity: "",
    fromPincode: "",
    toPincode: "",
    startTime: ""
  });

  return (
    <div>
      <div>
        <FormSearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} setVehicles={setVehicles} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-3/4 gap-6 p-6 m-auto">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} searchQuery={searchQuery} />
        ))}
      </div>

    </div>
  );
}
