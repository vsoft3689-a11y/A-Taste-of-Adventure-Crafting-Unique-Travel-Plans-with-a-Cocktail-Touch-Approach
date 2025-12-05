import React, { useEffect, useState } from "react";
import { fetchPackage, getTravelHistory, fetchReviews } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function PackageDetails() {
  const [pkg, setPkg] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const touristId = localStorage.getItem("userId");

  useEffect(() => {
    load();
    touristBookings();
    checkReviewed();
  }, [id]);

  async function load() {
    const res = await fetchPackage(id);
    setPkg(res);
  }

  async function touristBookings() {
    const res = await getTravelHistory(touristId);
    const filter = res.filter((b) => b?.travelPackage?.id === parseInt(id));
    setBookings(filter);
  }

  async function checkReviewed() {
    const reviews = await fetchReviews(id);
    console.log(reviews)
    const reviewed = reviews.some((r) => r.id === parseInt(id));
    setHasReviewed(reviewed);
  }

  if (!pkg)
    return (
      <div style={{ textAlign: "center", paddingTop: 50, fontSize: 18 }}>
        Loading...
      </div>
    );

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      {/* PACKAGE HEADER */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          marginBottom: "30px",
          border: "1px solid #eee",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#333" }}>{pkg.title}</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>{pkg.description}</p>

        <div style={{ marginTop: "15px", fontSize: "16px" }}>
          <p style={{ fontSize: "16px", color: "#555", fontWeight: "bolder" }}>
            {pkg.season} Package
          </p>
          <p style={{ margin: "5px 0" }}>
            <b>Package Type:</b> {pkg.packageType} Package
          </p>
          <p>
            <b>Price:</b> ₹{pkg.price}
          </p>
          <p>
            <b>Duration:</b> {pkg.durationDays} days
          </p>
          <p>
            <b>Available:</b> {pkg.availableFrom} - {pkg.availableTo}
          </p>
          <p>
            <b>People:</b> {pkg.minPeople} - {pkg.maxPeople} persons
          </p>
          <p>
            <b>Inclusions:</b> {pkg.inclusions}
          </p>
          <p>
            <b>Exclusions:</b> {pkg.exclusions}
          </p>
          <button
            style={{
              background: "#007bff",
              color: "white",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={() => navigate(`/package/${pkg.id}/reviews`)}
          >
            View Reviews
          </button> {"  "}
          {/* <br /> */}
          {bookings?.length > 0 ? (
            <>
              {hasReviewed ? (
                <>
                <p
                    style={{
                      color: "green",
                      fontWeight: "bold",
                      marginTop: 20,
                    }}
                  >
                    Already booked this package.
                  </p>
                <p style={{ color: "blue", marginTop: 20 }}>
                  Already reviewed.
                </p>
                </>
              ) : (
                <>
                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold",
                      marginTop: 20,
                    }}
                  >
                    You have already booked this package.
                  </p>

                  <button
                    style={{
                      background: "#007bff",
                      color: "white",
                      padding: "10px 18px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                    onClick={() => navigate(`/package/${pkg.id}/add-review`)}
                  >
                    Add Review
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <button
                style={{
                  background: "#007bff",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
                onClick={() => navigate(`/book/${pkg.id}`)}
              >
                Book Now
              </button>
            </>
          )}
        </div>
      </div>

      {/* LANDSCAPES SECTION */}
      <h3 style={{ marginBottom: "15px", color: "#333" }}>
        Landscapes Included
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {pkg.landscapes.map((l) => (
          <div
            key={l.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              border: "1px solid #eee",
            }}
          >
            {l.imageUrl && (
              <img
                src={l.imageUrl}
                alt={l.name}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}

            <h4 style={{ marginBottom: "5px", color: "#222" }}>{l.name}</h4>
            <p style={{ margin: "0", color: "#777" }}>
              <b>City:</b> {l.city}
            </p>

            <p
              style={{
                marginTop: "10px",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#555",
              }}
            >
              {l.description}
            </p>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#555",
              }}
            >
              Category: {l.category}
            </p>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#555",
              }}
            >
              Timings: {l.Timings}
            </p>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#555",
              }}
            >
              Contact: {l.contactInfo}
            </p>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#555",
              }}
            >
              IsCrowdedPlace: {l.isCrowdedPlace ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
