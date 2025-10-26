import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { editCourseDetails } from "../../../../services/Operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../utils/constants"
import IconBtn from "../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [thumbnailFile] = useState(null);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [course?.status, setValue])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
  // Check if form has been updated
  if (
    (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
    (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
  ) {
    goToCourses();
    return;
  }

  const formData = new FormData();
  formData.append("courseId", course._id);
  const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
  formData.append("status", courseStatus);
  console.log("Course Id is ", course._id)
  console.log("Course Status is ", courseStatus)
  // Only append thumbnail if a new file exists
  if (thumbnailFile) {
    formData.append("thumbnailImage", thumbnailFile);
    console.log("Thumbnail is ", thumbnailFile)
  }

  try {
    setLoading(true);

    // For publish step, **use editCourseDetails** (not addCourseDetails)
    const result = await editCourseDetails(formData, token);
    console.log("form data is ",formData)
    console.log("Token is ", token)
    console.log("Result is ",result)
    if (!result) {
      goToCourses();
    } else {
      toast.error("Failed to update course.");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message || "An error occurred");
  } finally {
    setLoading(false);
  }
};


  const onSubmit = (data) => {
    console.log(data)
    handleCoursePublish()
  }

 return (
  <div className="w-full max-w-3xl mx-auto rounded-lg border border-richblack-700 bg-richblack-800 p-6 md:p-8 shadow-lg transition-all duration-300">
    {/* Title */}
    <p className="text-2xl font-bold text-richblack-5 mb-6">Publish Settings</p>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Checkbox */}
      <div className="flex items-start">
        <label htmlFor="public" className="flex items-center text-lg cursor-pointer">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-5 w-5 rounded border-richblack-600 bg-richblack-700 text-yellow-400 focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
          />
          <span className="ml-3 text-richblack-300 select-none">
            Make this course public
          </span>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={goBack}
          disabled={loading}
          className={`flex items-center gap-2 rounded-md bg-richblack-300 px-5 py-2 text-sm font-semibold text-richblack-900 transition-all duration-300
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-richblack-200"}`}
        >
          Back
        </button>

        <IconBtn
          disabled={loading}
          className={`flex items-center gap-2 rounded-md bg-yellow-400 px-6 py-2 text-sm font-semibold text-richblack-900 transition-all duration-300 
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300 hover:scale-[1.02]"}`}
        >
          Save Changes
        </IconBtn>
      </div>
    </form>
  </div>
);

}

