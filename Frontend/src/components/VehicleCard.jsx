import { useNavigate } from "react-router-dom";
import { GiTruck } from "react-icons/gi";
import { FaTruckPickup, FaBusAlt, FaTractor } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

export const getVehicleIcon = (name) => {
  if (/tractor/i.test(name)) return <FaTractor className="text-4xl text-green-600" />;
  if (/pickup/i.test(name)) return <FaTruckPickup className="text-4xl text-blue-600" />;
  if (/cargo/i.test(name)) return <GiTruck className="text-4xl text-orange-600" />;
  if (/bus/i.test(name)) return <FaBusAlt className="text-4xl text-purple-600" />;
  return <TbTruckDelivery className="text-4xl text-gray-600" />;
};

export default function VehicleCard({ vehicle, searchQuery }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl shadow-lg bg-white p-6 transition duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{vehicle.name}</h2>
        {getVehicleIcon(vehicle.name)}
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p><span className="font-medium">Capacity:</span> {vehicle.capacityKg} kg</p>
        <p><span className="font-medium">Tyres:</span> {vehicle.tyres}</p>
        <p><span className="font-medium">Status:</span> {vehicle.status}</p>
      </div>

      <div className="mt-5 flex justify-around">
        <button
          className="px-5 py-2 text-sm font-semibold bg-amber-500 text-white rounded-full shadow-md hover:bg-amber-600 hover:shadow-lg transition duration-200"
          onClick={() => navigate(`/bookings/${vehicle._id}`, { state: { searchQuery } })}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
