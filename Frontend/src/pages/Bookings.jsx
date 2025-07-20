import toast from 'react-hot-toast';
import BookingForm from '../components/BookingForm';

export default function Bookings() {
  async function handleBooking(formData) {
    try {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
         
        })

      });

      const data = await response.json();
      if(!response.ok){
        throw new Error(data?.errors || data?.error )
      }
      toast.success(data.message || "Vehicle added successfully!")
    }
    catch (err) {
      toast.error(err.message || "Something went wrong!");
      console.error("Vehicle creation error:", err);

    }
  }

  return (
    <div className="p-6">
      <BookingForm onBook={handleBooking} />
    </div>
  );
}
