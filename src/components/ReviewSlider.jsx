import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

// Get apiFunction and the endpoint
import { apiConnector } from "../services/apiconnector"
import { ratingsEndpoints } from "../services/apis"
 const dummyReviews = [
  {
    user: {
      firstName: "John",
      lastName: "Doe",
      image: "",
    },
    course: {
      courseName: "React for Beginners",
    },
    review:
      "This course was really helpful and gave me a solid foundation in React!",
    rating: 4.5,
  },
  {
    user: {
      firstName: "Jane",
      lastName: "Smith",
      image: "",
    },
    course: {
      courseName: "Advanced JavaScript",
    },
    review:
      "Great explanations and very detailed examples. Highly recommend!",
    rating: 5.0,
  },
  {
    user: {
      firstName: "Bob",
      lastName: "Brown",
      image: "",
    },
    course: {
      courseName: "UI/UX Design Principles",
    },
    review:
      "I learned so much about creating user-friendly interfaces. Thank you!",
    rating: 4.2,
  },
  {
    user: {
      firstName: "Alice",
      lastName: "Johnson",
      image: "",
    },
    course: {
      courseName: "Python for Data Science",
    },
    review: "Very insightful and beginner-friendly course. Loved it!",
    rating: 4.7,
  },
  {
    user: {
      firstName: "Carlos",
      lastName: "Martinez",
      image: "",
    },
    course: {
      courseName: "Full-Stack Web Development",
    },
    review:
      "The instructors were top-notch and the projects helped me build a real portfolio.",
    rating: 4.8,
  },
  {
    user: {
      firstName: "Emily",
      lastName: "Wong",
      image: "",
    },
    course: {
      courseName: "Machine Learning Basics",
    },
    review:
      "Challenging but rewarding. Excellent content and structured learning path.",
    rating: 4.4,
  },
  {
    user: {
      firstName: "Liam",
      lastName: "Nguyen",
      image: "",
    },
    course: {
      courseName: "DevOps Fundamentals",
    },
    review:
      "Helped me understand CI/CD pipelines and real-world DevOps practices.",
    rating: 4.6,
  },
  {
    user: {
      firstName: "Fatima",
      lastName: "Al-Farsi",
      image: "",
    },
    course: {
      courseName: "Cloud Computing with AWS",
    },
    review:
      "Very practical course with hands-on labs and real AWS experience. Loved it!",
    rating: 5.0,
  },
]

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

useEffect(() => {
  (async () => {
    try {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      console.log("API response:", data)

      if (data?.success && Array.isArray(data?.data) && data.data.length > 0) {
  setReviews(data.data)
} else {
  console.warn("Using dummy reviews due to empty or failed API.")
  setReviews(dummyReviews)
}

    } catch (error) {
      console.error("API call failed:", error)
      console.warn("Using dummy data due to error.")
      setReviews(dummyReviews)
    }
  })()
}, [])

  // console.log(reviews)
console.log("Reviews data:", reviews)

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
  spaceBetween={20}
  loop={reviews.length > 1}
  freeMode={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  breakpoints={{
    320: { slidesPerView: 1 },       // small phones
    640: { slidesPerView: 2 },       // tablets
    1024: { slidesPerView: 3 },      // small laptops
    1280: { slidesPerView: 4 },      // desktops and up
  }}
  modules={[FreeMode, Pagination, Autoplay]}
  className="w-full"
>

          {reviews.map((review, i) => {
            return (
  <div className="text-white">
    <div className="my-10 max-w-maxContentTab lg:max-w-maxContent mx-auto px-4">
      <Swiper
        spaceBetween={20}
        loop={reviews.length > 1}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="w-full"
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col gap-3 bg-richblack-800 p-4 md:p-5 text-sm md:text-base text-richblack-25 rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={
                    review?.user?.image
                      ? review.user.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstName} ${review.user.lastName}`
                  }
                  alt=""
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-richblack-5">
                    {`${review.user.firstName} ${review.user.lastName}`}
                  </h1>
                  <h2 className="text-xs md:text-sm font-medium text-richblack-500">
                    {review.course.courseName}
                  </h2>
                </div>
              </div>
              <p className="font-medium text-richblack-25">
                {review.review.split(" ").length > truncateWords
                  ? `${review.review
                      .split(" ")
                      .slice(0, truncateWords)
                      .join(" ")} ...`
                  : review.review}
              </p>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-yellow-100">
                  {review.rating.toFixed(1)}
                </h3>
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
            )
        }
    )
    }
</Swiper>
</div>
</div>
  )
}

export default ReviewSlider
