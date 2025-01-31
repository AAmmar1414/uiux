"use client"
import { useState } from "react";

const CustomerReviews = () => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleRating = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (rating === 0 || review.trim() === "") {
      alert("Please provide a rating and write a review.");
      return;
    }
    setSubmitted(true);
    // You can send the data to an API here
    console.log("Submitted Review:", { rating, review });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleRating(index)}
            className={`text-2xl ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
        <span className="text-gray-600">{rating} out of 5</span>
      </div>
      <textarea
        className="w-full border border-gray-300 p-2 rounded mb-4"
        rows={4}
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Review
      </button>
      {submitted && (
        <p className="mt-4 text-green-500">Thank you for your feedback!</p>
      )}
    </div>
  );
};

export default CustomerReviews;
