import React, { useState } from 'react'
import toast from 'react-hot-toast';

const FormSearchComponent = ({ searchQuery, setSearchQuery, setVehicles }) => {
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        setSearchQuery({ ...searchQuery, [key]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const str = Object.entries(searchQuery).map((ele) => {
            return ele.join("=");
        }).join("&")

        try {
            const response = await fetch(`http://localhost:3000/api/vehicles/available?${str}`);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error(data.errors || data.message || "Invalid input data");
                }
                if (response.status === 500) {
                    throw new Error(data.error || "Internal server error");
                }
                throw new Error("Unknown error occurred");
            }

            const vehicles = data?.message?.SearchItems;

            if (!Array.isArray(vehicles) || vehicles.length === 0) {
                setVehicles([]);
                throw new Error("No vehicles available. Please relax your preferences.");
            }

            setVehicles(vehicles);
        } catch (err) {
            console.error("Failed to fetch vehicles", err);
            toast.error(err.message || "Failed to fetch vehicles");
        } finally {
            setLoading(false);
        }

    }

    return (
        <form onSubmit={(e) => { handleSubmit(e) }} className='max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4 m-auto'>
            <h2 className="text-2xl font-semibold mb-6 text-center">Search for Vehicle</h2>
            <label className='block text-sm font-medium text-gray-700'>CapacityKg Required</label>
            <input
                placeholder='Capacity eg:500kg'
                type="number"
                name="capacity"
                defaultValue={""}
                onChange={(e) => { handleChange(e) }}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></input>
            <label className='block text-sm font-medium text-gray-700'>From Pincode</label>
            <input
                placeholder='starting pincode'
                type="number"
                name="fromPincode"
                defaultValue={""}
                onChange={(e) => { handleChange(e) }}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></input>
            <label className='block text-sm font-medium text-gray-700'>To Pincode</label>
            <input
                placeholder='ending pincode'
                type="number"
                name="toPincode"
                defaultValue={""}
                onChange={(e) => { handleChange(e) }}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></input>
            <label className='block text-sm font-medium text-gray-700'>Date</label>
            <input
                type="date"
                name="startTime"
                defaultValue={""}
                onChange={(e) => { handleChange(e) }}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></input>

            <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-amber-100' : 'bg-amber-400'} hover:bg-amber-500 text-white py-2 rounded-lg font-medium transition duration-200 cursor-pointer`}
            >Search Availability</button>
        </form>
    )
}

export default FormSearchComponent