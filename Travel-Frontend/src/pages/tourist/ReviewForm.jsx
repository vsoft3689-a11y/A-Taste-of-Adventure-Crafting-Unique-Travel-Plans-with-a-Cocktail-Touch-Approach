import React, { useState } from "react";
import { submitReview } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const touristId = localStorage.getItem("userId");
  const { id } = useParams();
  const packageId = id;

  async function handleSubmit() {
    await submitReview(touristId, packageId, rating, comment);
    alert("Review submitted!");
    setRating(5);
    setComment("");
    navigate(`/package/${packageId}`);
  }

  return (
    <div
      style={{
        padding: 25,
        background: "white",
        borderRadius: 12,
        width: "450px",
        margin: "40px auto",
        boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Write a Review</h2>

      {/* STAR RATING */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: "pointer",
              fontSize: "32px",
              color:
                star <= (hover || rating) ? "#FFD700" : "#ccc",
              transition: "0.2s",
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          >
            ★
          </span>
        ))}
      </div>

      {/* COMMENT */}
      <textarea
        placeholder="Write your comments..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 14,
          minHeight: 100,
          resize: "vertical",
        }}
      />

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          marginTop: 20,
          padding: "12px 20px",
          background: "#27ae60",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        Submit Review
      </button>
    </div>
  );
}
