import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Vehicle = () => {
    const [formData, setFormData] = useState({
        name: '',
        capacityKg: '',
        tyres: '',
        status: 'available',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target)
        try {
            const response = await fetch("http://localhost:3000/api/vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    capacityKg: Number(formData.capacityKg),
                    tyres: Number(formData.tyres),
                })

            });

            const data = await response.json();
            console.log(data);
            toast.success(data.message || "Vehicle added successfully!");
        }
        catch (err) {
            toast.error(err.message || "Something went wrong!");
            console.error("Vehicle creation error:", err);

        }

    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add a New Vehicle</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g. Tata Ace"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Capacity (Kg)</label>
                    <input
                        type="number"
                        name="capacityKg"
                        placeholder="e.g. 1200"
                        value={formData.capacityKg}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tyres</label>
                    <input
                        type="number"
                        name="tyres"
                        placeholder="e.g. 4"
                        value={formData.tyres}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="available">Available</option>
                        <option value="inUse">In Use</option>
                        <option value="not available">Not Available</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    Submit Vehicle
                </button>
            </form>
        </div>
    );
};

export default Vehicle;
