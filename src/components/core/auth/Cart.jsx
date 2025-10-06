import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RenderCartCourses from "../../Cart/RenderCartCourses";
import RenderTotalAmount from "../../Cart/RenderTotalAmount";



export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <div className="min-h-screen bg-richblack-900 p-4 sm:p-6 lg:p-8 text-white">
            <div className="mx-auto ">
                {/* A cleaner, static title */}
                <h1 className="text-center mb-6 text-3xl font-medium text-blue-200">
                    Shopping Cart 🛍️
                </h1>

                <p className="text-center border-b pb-2 font-semibold text-yellow-200">
                    {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
                </p>

                {total > 0 ? (
                    // Two-column layout for larger screens
                    <div className="mt-8 flex flex-col justify-between gap-8 ">
                        
                        {/* Left Side: Cart Items */}
                        <div className="flex-1">
                            <RenderCartCourses />
                        </div>
                        
                        {/* Right Side: Total Amount Summary */}
                        <div className="text-center lg:sticky lg:top-10 h-fit">
                            <RenderTotalAmount />
                        </div>

                    </div>
                ) : (
                    // Empty Cart View - with a more subtle button animation
                    <div className="mt-14 text-center flex flex-col items-center justify-center gap-4">
                        <p className="text-3xl text-richblack-300">
                            Your Cart is Empty 🛒
                        </p>
                        <p className="text-richblack-400">
                            Add some courses to get started.
                        </p>
                        <Link
                            to="/catalog/:catalogName" // Example link
                            className="mt-4 inline-block rounded-lg bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        >
                            Browse Courses
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
