import { useState } from "react";
import { Star } from "lucide-react";
import { reviewsApi } from "../utils/api";
export default function FoodReviewForm() {
  const [rating, setRating] = useState(0);


const [reviewData, setReviewData] = useState({
  residentName: "",
  roomNo: "",
  foodType: "",
  review: "",
});

const [successMessage, setSuccessMessage] = useState("");
const handleSubmit = async () => {
  try {
    await reviewsApi.create({
      resident_name: reviewData.residentName,
      room_no: reviewData.roomNo,
      food_type: reviewData.foodType,
      rating,
      review: reviewData.review,
    });

    alert("Review Submitted");

    setReviewData({
      residentName: "",
      roomNo: "",
      foodType: "",
      review: "",
    });

    setRating(0);

  } catch (err) {
    console.log(err);
  }
};
  return (
   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mt-6">

      <h2 className="text-lg font-semibold mb-4 text-slate-800">
         Food Reviews
      </h2>
{successMessage && (
  <div className="mb-4 bg-green-50 text-green-700 border border-green-200 p-3 rounded-xl text-sm">
    {successMessage}
  </div>
)}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Student Name */}
        <div>
  <label className="block mb-2 text-sm font-medium text-slate-700">
    Resident Name
  </label>

  <input
    type="text"
    value={reviewData.residentName}
    onChange={(e) =>
      setReviewData({
        ...reviewData,
        residentName: e.target.value,
      })
    }
    placeholder="Enter Resident Name"
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
  />
</div>

<div>
  <label className="block mb-2 text-sm font-medium text-slate-700">
    Room Number
  </label>

  <input
    type="text"
    value={reviewData.roomNo}
    onChange={(e) =>
      setReviewData({
        ...reviewData,
        roomNo: e.target.value,
      })
    }
    placeholder="A-101"
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
  />
</div>

<div>
  <label className="block mb-2 text-sm font-medium text-slate-700">
    Food Category
  </label>

  <select
    value={reviewData.foodType}
    onChange={(e) =>
      setReviewData({
        ...reviewData,
        foodType: e.target.value,
      })
    }
    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
  >
    <option value="">
      Select Food Type
    </option>

    <option>Breakfast</option>
    <option>Lunch</option>
    <option>Dinner</option>
    <option>Snacks</option>
  </select>
</div>

        {/* Rating */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Food Rating
          </label>

          <div className="flex gap-2 mt-2">

            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
              >
                <Star
                  size={22}
                  className={
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }
                />
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* Review Content */}
      <div className="mt-5">

        <label className="block mb-2 text-sm font-medium text-slate-700">
          Review Content
        </label>

       <textarea
  rows="5"
  value={reviewData.review}
  onChange={(e) =>
    setReviewData({
      ...reviewData,
      review: e.target.value,
    })
  }
  placeholder="Write your food review..."
  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm resize-none"
/>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

       <button
  onClick={() => {
    setReviewData({
      studentName: "",
      className: "",
      section: "",
      review: "",
    });

    setRating(0);
  }}
  className="px-5 py-2.5 text-sm border border-slate-300 rounded-xl hover:bg-slate-100"
>
  Cancel
</button>

        <button
  onClick={handleSubmit}
  className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700"
>
  Submit Review
</button>

      </div>

    </div>
  );
}