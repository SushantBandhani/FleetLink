import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BookingForm({ onBook }) {
  const [formData, setFormData] = useState({
    vehicleId: '',
    fromPincode: '',
    toPincode: '',
    startTime: '',
    endTime: '',
    customerId: '',
  });

  const {id}=useParams();
  useEffect(()=>{
    setFormData({...formData,vehicleId:id})
  },[])
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onBook?.(formData);
    setFormData({
      vehicleId: '',
      fromPincode: '',
      toPincode: '',
      startTime: '',
      endTime: '',
      customerId: '',
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4 m-auto">
      <h2 className="text-lg font-semibold text-gray-800">Book Vehicle</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Vehicle ID</label>
        <input
          type="text"
          name="vehicleId"
          value={formData.vehicleId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">From Pincode</label>
          <input
            type="text"
            name="fromPincode"
            value={formData.fromPincode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To Pincode</label>
          <input
            type="text"
            name="toPincode"
            value={formData.toPincode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="date"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="date"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Customer ID</label>
        <input
          type="text"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-400 hover:bg-amber-500 text-white py-2 rounded-lg font-medium transition duration-200"
      >
        Confirm Booking
      </button>
    </form>
  );
}
