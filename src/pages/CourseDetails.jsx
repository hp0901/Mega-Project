import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"

// Component Imports
import ConfirmationModal from "../components/common/ConformationModel"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"

// Slice and Service Imports
import { addToCart } from "../slices/cartSlice"
import { formatDate } from "../services/formatDate"
import { BuyCourse } from "../services/Operations/studentFeaturesAPI"
import { fetchCourseDetails, getAllCourses } from "../services/Operations/courseDetailsAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

function CourseDetails() {
  // Redux and Router Hooks
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  // const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()

  // Component State
  const [response, setResponse] = useState(null)
  const [relatedCourses, setRelatedCourses] = useState([])
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [isActive, setIsActive] = useState([])
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)

  // ========================================================
  // 1. Fetch main course details when courseId changes
  // ========================================================
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.error("Could not fetch Course Details", error)
      }
    })()
  }, [courseId])

  // ========================================================
  // 2. Safely destructure data from the API response
  // ========================================================
  const course = response?.data?.[0] || {}
  const instructor = course?.instructor ?? { firstName: "", lastName: "", image: "", additionalDetails: {} }
  const {
    // eslint-disable-next-line_id: course_id ,
    courseName = "Course Name",
    courseDescription = "No description available.",
    thumbnail = "",
    price = 0,
    whatYouWillLearn = "",
    courseContent = [],
    ratingAndReviews = [],
    studentsEnroled = [],
    createdAt = new Date(),
    category, // Get category for filtering
  } = course
  console.log("Cource catagory", category)
  // ========================================================
  // 3. Fetch and filter related courses
  // ========================================================
  useEffect(() => {
    if (category?._id) {
      (async () => {
        const allCourses = await getAllCourses()
        if (allCourses?.length > 0) {
          const otherCourses = allCourses.filter(
            (c) => c.category?._id === category._id && c._id !== courseId
          )
          setRelatedCourses(otherCourses)
        }
      })()
    }
  }, [category, courseId])

  // ========================================================
  // 4. Calculate ratings and total lectures
  // ========================================================
  useEffect(() => {
    const count = GetAvgRating(ratingAndReviews || [])
    setAvgReviewCount(count)
  }, [ratingAndReviews])

  useEffect(() => {
    let lectures = 0
    ;(courseContent || []).forEach((sec) => (lectures += sec.subSection?.length || 0))
    setTotalNoOfLectures(lectures)
  }, [courseContent])

  // ========================================================
  // Handlers
  // ========================================================
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id) ? [...isActive, id] : isActive.filter((e) => e !== id)
    )
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
    dispatch(addToCart(course))
  }

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase this course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // ========================================================
  // Loading and Error States
  // ========================================================
  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!response?.success) {
    return <Error />
  }

  // ========================================================
  // Main Component Render
  // ========================================================
  return (
    <>
      <div className="relative w-full bg-richblack-800">
        <div className="mx-auto max-w-[1260px] px-4 2xl:relative">
          <div className="grid min-h-[450px] grid-cols-1 lg:grid-cols-3 gap-8 py-8 lg:py-16">
            {/* Left Section: Course Info */}
            <div className="lg:col-span-2 flex flex-col justify-center gap-4 text-richblack-5">
              <img src={thumbnail} alt="course thumbnail" className="w-full max-h-[30rem] object-cover rounded-lg lg:hidden" />
              <h1 className="text-4xl sm:text-5xl font-bold">{courseName}</h1>
              <p className="text-richblack-200">{courseDescription}</p>
              <div className="flex flex-wrap items-center gap-4 text-md">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>({ratingAndReviews.length} reviews)</span>
                <span>{studentsEnroled.length} students enrolled</span>
              </div>
              <p>Created by {`${instructor.firstName} ${instructor.lastName}`}</p>
              <div className="flex flex-wrap gap-6 text-lg mt-2">
                <p className="flex items-center gap-2"><BiInfoCircle /> Created at {formatDate(createdAt)}</p>
                <p className="flex items-center gap-2"><HiOutlineGlobeAlt /> English</p>
              </div>
              <div className="flex flex-col gap-4 mt-6 border-t border-b border-richblack-500 py-4 lg:hidden">
                <p className="text-3xl font-semibold text-richblack-5">Rs. {price}</p>
                <button className="yellowButton" onClick={handleBuyCourse}>Buy Now</button>
                <button className="blackButton" onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
            {/* Right Section: Course Card (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-1">
              <CourseDetailsCard course={course} setConfirmationModal={setConfirmationModal} handleBuyCourse={handleBuyCourse} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1260px] px-4 text-richblack-5">
        <div className="mx-auto max-w-[810px]">
          <section className="my-8 border border-richblack-600 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">What you'll learn</h2>
            <div className="prose text-richblack-5 max-w-full">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </section>

          <section className="my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Course Content</h2>
              <button className="text-yellow-25 font-medium" onClick={() => setIsActive([])}>Collapse all sections</button>
            </div>
            <div className="mb-4 text-md flex flex-wrap gap-4">
              <span>{courseContent.length} section(s)</span>
              <span>{totalNoOfLectures} lecture(s)</span>
              <span>{response?.data?.totalDuration || "0h 0m"} total length</span>
            </div>
            <div className="space-y-3">
              {courseContent?.map((sec, index) => (
                <CourseAccordionBar course={sec} key={index} isActive={isActive} handleActive={handleActive} />
              ))}
            </div>
          </section>

          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Author</h2>
            <div className="flex items-center gap-4 mb-2">
              <img
                src={instructor.image ? instructor.image : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`}
                alt="Author"
                className="h-14 w-14 rounded-full object-cover"
              />
              <p className="font-medium">{`${instructor.firstName} ${instructor.lastName}`}</p>
            </div>
            <p className="text-richblack-50">{instructor?.additionalDetails?.about || "No details available."}</p>
          </section>
        </div>
      </div>

      <div className="mx-auto max-w-[1260px] px-4 text-richblack-5 mt-12 mb-10">
        <h2 className="text-3xl font-bold mb-6">More Courses in {category?.name}</h2>
        {relatedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedCourses.map((relatedCourse) => (
              <Link to={`/courses/${relatedCourse._id}`} key={relatedCourse._id} onClick={() => setResponse(null)}>
                <div className="bg-richblack-800 p-4 rounded-lg hover:scale-105 transition-transform duration-200">
                  <img
                    src={relatedCourse.thumbnail}
                    alt={relatedCourse.courseName}
                    className="h-40 w-full object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold">{relatedCourse.courseName}</h3>
                  <p className="text-sm text-richblack-300">
                    By {relatedCourse.instructor?.firstName} {relatedCourse.instructor?.lastName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-richblack-200">No other courses found in this category.</p>
        )}
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails