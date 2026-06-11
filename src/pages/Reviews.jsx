import { useState } from "react";
import { Star } from "lucide-react";

export default function FoodReviewForm() {
  const [rating, setRating] = useState(0);


const [reviewData, setReviewData] = useState({
  residentName: "",
  roomNo: "",
  foodType: "",
  review: "",
});

const [successMessage, setSuccessMessage] = useState("");
const handleSubmit = () => {
  if (
    !reviewData.studentName ||
    !reviewData.className ||
    !reviewData.section ||
    !reviewData.review ||
    rating === 0
  ) {
    alert("Please fill all fields");
    return;
  }

  setSuccessMessage("✅ Your review has been submitted successfully!");

  setReviewData({
    studentName: "",
    className: "",
    section: "",
    review: "",
  });

  setRating(0);

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);
};
  return (
   <div className="bg-white rounded-3xl shadow-sm p-4 md:p-6 lg:p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
         Food Reviews
      </h2>
{successMessage && (
  <div className="mb-5 bg-green-100 text-green-700 border border-green-300 p-4 rounded-xl">
    {successMessage}
  </div>
)}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Student Name */}
        <div>
  <label className="block mb-2 font-medium">
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
    className="w-full border border-slate-300 rounded-xl px-4 py-3"
  />
</div>

<div>
  <label className="block mb-2 font-medium">
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
    className="w-full border border-slate-300 rounded-xl px-4 py-3"
  />
</div>

<div>
  <label className="block mb-2 font-medium">
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
    className="w-full border border-slate-300 rounded-xl px-4 py-3"
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
          <label className="block mb-2 font-medium">
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
                  size={28}
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

        <label className="block mb-2 font-medium">
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
  className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none"
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
  className="px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-100"
>
  Cancel
</button>

        <button
  onClick={handleSubmit}
  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
>
  Submit Review
</button>

      </div>

    </div>
  );
}