import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!course) return null

  // Use API field names directly
  const {
    _id: courseId,
    courseName,
    price,
    thumbnail,
    instructions = [],
    studentsEnrolled = [], // note the API field is "studentsEnrolled" not "studentsEnroled"
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add to cart.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })
      return
    }

    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot buy courses.")
      return
    }

    console.log("course id", courseId)
    console.log("course", course)
    if (!courseId) return
    dispatch(addToCart(course))
    toast.success("Course added to cart")
  }

  return (
    <div className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5">
      {/* Course Image */}
      <img
        src={thumbnail || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={courseName}
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />

      <div className="px-4">
        {/* Price */}
        <div className="space-x-3 pb-4 text-3xl font-semibold">Rs. {price}</div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            className="yellowButton"
            onClick={
              user && studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && studentsEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>

          {(user || !studentsEnrolled.includes(user?._id)) && (
            <button onClick={handleAddToCart} className="blackButton">
              Add to Cart
            </button>
          )}
        </div>

        {/* Guarantee */}
        <p className="pb-3 pt-6 text-center text-sm text-white">
          30-Day Money-Back Guarantee
        </p>

        {/* Course Includes */}
        {instructions.length > 0 && (
          <div>
            <p className="my-2 text-xl font-semibold">This Course Includes :</p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {instructions.map((item, i) => (
                <p className="flex gap-2" key={i}>
                  <BsFillCaretRightFill />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 py-6 text-yellow-100"
            onClick={handleShare}
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard

