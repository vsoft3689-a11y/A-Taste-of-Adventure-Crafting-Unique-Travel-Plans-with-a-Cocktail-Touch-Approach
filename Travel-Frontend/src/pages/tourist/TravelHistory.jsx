import React, { useEffect, useState } from "react";
import { getTravelHistory } from "../../api";

export default function TravelHistory() {
  const [history, setHistory] = useState([]);
  const touristId = localStorage.getItem("userId");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getTravelHistory(touristId);
    setHistory(res);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Your Travel Bookings</h2>

      <hr />

      <br />
      {history.length === 0 && (
        <div
          style={{
            background: "#f9f9f9",
            padding: 20,
            textAlign: "center",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        >
          No travel history found.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {history.map((h) => (
          <div
            key={h.id}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              border: "1px solid #e2e2e2",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "0.2s ease",
            }}
          >
            <h3 style={{ marginBottom: 10 }}>{h.travelPackage.title}</h3>

            <p style={{ margin: "5px 0" }}>
              <b>Date:</b> {h.bookingDate}
            </p>

            <p style={{ margin: "5px 0" }}>
              <b>Amount Paid:</b> ₹{h.pricePaid}
            </p>

            {h.travelPackage.season && (
              <p style={{ margin: "5px 0" }}>
                <b>Season:</b> {h.travelPackage.season}
              </p>
            )}

            <div
            // style={{
            //   marginTop: 10,
            //   padding: "8px 12px",
            //   background: "#f1f5f9",
            //   borderRadius: "6px",
            //   fontSize: 14,
            //   color: "#555",
            // }}
            >
              <b>Duration: </b>
              <span
                style={{
                  background: "#f1f5f9",
                  fontSize: 14,
                  color: "#555",
                  padding: "4px 8px",
                  borderRadius: 6,
                }}
              >
                {" "}
                {h.travelPackage.durationDays} days
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
