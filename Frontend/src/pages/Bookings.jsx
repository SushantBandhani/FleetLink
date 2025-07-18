import toast from 'react-hot-toast';
import BookingForm from '../components/BookingForm';

export default function Bookings() {
  async function handleBooking(formData) {
    try {
      const response = await fetch("http://localhost:3000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
         
        })

      });

      const data = await response.json();
      console.log(data);
      if(data?.message){
        toast.success(data.message || "Vehicle added successfully!");
      }
      else{
        if(data?.details){
          throw Error(data.details.join(" and "))
        }
        else{
          throw Error(data.error);
        }

      }
    }
    catch (err) {
      toast.error(err.message || "Something went wrong!");
      console.error("Vehicle creation error:", err);

    }
    // Make API call here if needed
  }

  return (
    <div className="p-6">
      <BookingForm onBook={handleBooking} />
    </div>
  );
}
