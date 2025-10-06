import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../slices/cartSlice';
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="w-full max-w-5xl mx-auto text-center flex flex-col gap-6 px-4 sm:px-6 md:px-8">
  {cart.map((course, index) => (
    <div
      key={index}
      className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-richblack-700 py-6"
    >
      {/* Thumbnail */}
      <img
        src={course?.thumbnail}
        alt={`${course?.courseName} thumbnail`}
        className="w-full sm:w-44 h-auto sm:h-28 rounded-lg object-cover"
      />

      {/* Course Info */}
      <div className="flex flex-col gap-2 text-left">
        <p className="text-lg font-medium text-richblack-5 truncate">{course?.courseName}</p>
        <p className="text-sm text-richblack-300">{course?.category?.name}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="font-semibold text-yellow-100">4.8</span>
          <ReactStars
            count={5}
            value={4.8}
            size={20}
            edit={false}
            activeColor="#ffd700"
            emptyIcon={<GiNinjaStar />}
            fullIcon={<GiNinjaStar />}
          />
          <span className="text-richblack-400">
            {course?.ratingAndReviews?.length || 0} Ratings
          </span>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end gap-3">
        <p className="text-xl sm:text-2xl font-semibold text-yellow-100">
          ₹ {course?.price}
        </p>
        <button
          onClick={() => dispatch(removeFromCart(course._id))}
          className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 px-3 py-1 text-pink-200 transition-all duration-200 hover:bg-richblack-600"
        >
          <RiDeleteBin6Line size={18} />
          <span>Remove</span>
        </button>
      </div>
    </div>
  ))}
</div>

    );
};

export default RenderCartCourses;
