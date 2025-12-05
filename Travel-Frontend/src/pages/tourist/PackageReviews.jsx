import React, { useEffect, useState } from "react";
import { fetchReviews } from "../../api";
import { useParams } from "react-router-dom";

export default function PackageReviews() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      const data = await fetchReviews(id);
      setReviews(data);
    }
    load();
  }, [id]);
console.log(reviews)
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "25px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Package Reviews</h2>

      {/* If no reviews */}
      {reviews.length === 0 && (
        <p style={{ textAlign: "center", color: "#777", fontSize: 16 }}>
          No reviews yet.
        </p>
      )}

      {/* Reviews list */}
      {reviews.map((r) => (
        <div
          key={r.id}
          style={{
            background: "#f8f8f8",
            padding: "18px",
            borderRadius: "12px",
            marginTop: "15px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          {/* Rating stars */}
          <div style={{ marginBottom: 8 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  color: star <= r.rating ? "#FFD700" : "#ccc",
                  fontSize: "22px",
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Comment */}
          <p style={{ fontSize: 16, marginBottom: 10 }}>
           <b>{r?.tourist?.name}</b>
          </p>
          <p style={{ fontSize: 16, marginBottom: 10 }}>
            <b>Comment:</b> {r.comment}
          </p>

          {/* Date */}
          <small style={{ color: "#777" }}>
            {r.date || "Date not available"}
          </small>
        </div>
      ))}
    </div>
  );
}
