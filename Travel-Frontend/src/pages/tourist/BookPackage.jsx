import React, { useState, useEffect } from "react";
import { fetchPackage, bookPackage } from "../../api";
import { useParams, useNavigate } from "react-router-dom";

export default function BookPackage() {
  const { id } = useParams(); // packageId
  const touristId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [persons, setPersons] = useState(1);
  const [total, setTotal] = useState(0);
  // const [travelDate, setTravelDate] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetchPackage(id);
      setPkg(res);
      setTotal(res.price); // total for 1 person
    }
    load();
  }, [id]);

  function calculateTotal(count) {
    const num = Number(count);
    setPersons(num);
    setTotal(pkg.price * num);
  }

  async function handleBooking() {
    // if (!travelDate) {
    //   alert("Please select a travel date!");
    //   return;
    // }
    // travelDate,
    if(persons < 1) {
      alert("Number of persons must be at least 1");
      return;
    }

    const bookingData = {
      numberOfPersons: persons,
      pricePaid: total,
    };

    await bookPackage(touristId, id, bookingData);
    alert("Booking Successful!");
    navigate("/history");
  }

  if (!pkg) return <h3>Loading...</h3>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: 30 }}>
      <h2 style={{ marginBottom: 20 }}>Book: {pkg.title}</h2>

      <div
        style={{
          background: "#fafafa",
          padding: 25,
          borderRadius: 12,
          boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ marginBottom: 15 }}>
          <b>Price per person:</b> ₹{pkg.price}
        </p>

        {/* Travel Date */}
        {/* <label style={{ fontWeight: "bold" }}>Travel Date:</label>
        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          style={{
            display: "block",
            padding: 10,
            width: "100%",
            marginBottom: 20,
          }}
        /> */}

        {/* Persons */}
        <label style={{ fontWeight: "bold" }}>No. of Persons:</label>
        <input
          type="number"
          min="1"
          value={persons}
          onChange={(e) => calculateTotal(e.target.value)}
          style={{
            display: "block",
            padding: 10,
            width: "100%",
            marginBottom: 20,
          }}
        />

        {/* Total */}
        <h3>Total Amount: ₹{total}</h3>

        <button
          onClick={handleBooking}
          style={{
            marginTop: 20,
            background: "#28a745",
            color: "white",
            padding: "12px 20px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
