import React, { useEffect, useState } from "react";
import { fetchBookings } from "../../api";
import "../../App.css";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const data = await fetchBookings();
      setBookings(data);
    } catch (e) {
      console.error("Failed to fetch bookings", e);
    }
  }

  return (
    <div className="ab-container">
      <h2 className="ab-heading">📋 Manage Travel Bookings</h2>

      <div className="ab-table-wrapper">
        {bookings.length === 0 ? (
          <p className="ab-empty">No bookings available.</p>
        ) : (
          <table className="ab-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Package</th>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="ab-row">
                  <td>{booking.id}</td>
                  <td>{booking.travelPackage.title}</td>
                  <td>{booking.tourist.name}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`ab-status ${
                        booking.status === "BOOKED"
                          ? "ab-status-green"
                          : booking.status === "PENDING"
                          ? "ab-status-yellow"
                          : "ab-status-red"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
