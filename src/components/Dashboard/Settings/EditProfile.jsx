import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../services/Operations/SettingsAPI"
import IconBtn from '../../common/IconBtn'

const genders = ["Male", "Female",  "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
  <>
    <form onSubmit={handleSubmit(submitProfileForm)}>
      {/* Profile Information */}
      <div className="my-10 flex flex-col gap-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 shadow-md">
        <h2 className=" pointer-events-nonetext-xl font-semibold text-richblack-5 border-b border-richblack-700 pb-3">
          Profile Information
        </h2>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col gap-3 lg:w-[48%]">
            <label
              htmlFor="firstName"
              className="pointer-events-none text-richblack-50 font-semibold text-sm mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              className="form-style bg-richblack-900 border border-richblack-700 rounded-md py-3 px-4 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="-mt-1 text-[12px] text-yellow-400">
                Please enter your first name.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:w-[48%]">
            <label
              htmlFor="lastName"
              className="pointer-events-none text-richblack-50 font-semibold text-sm mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              className="form-style bg-richblack-900 border border-richblack-700 rounded-md py-3 px-4 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="-mt-1 text-[12px] text-yellow-400">
                Please enter your last name.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col gap-3 lg:w-[48%]">
            <label
              htmlFor="dateOfBirth"
              className="pointer-events-none text-richblack-50 font-semibold text-sm mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="form-style bg-richblack-900 border border-richblack-700 rounded-md py-3 px-4 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition"
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "Please enter your Date of Birth.",
                },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <span className="-mt-1 text-[12px] text-yellow-400">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:w-[48%]">
            <label
              htmlFor="gender"
              className="pointer-events-none text-richblack-50 font-semibold text-sm mb-1"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="form-style bg-richblack-900 border border-richblack-700 rounded-md py-3 px-4 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((ele, i) => (
                <option key={i} value={ele} className="bg-richblack-800 text-richblack-5">
                  {ele}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="-mt-1 text-[12px] text-yellow-400">
                Please select your gender.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col gap-3 lg:w-[48%]">
            <label
              htmlFor="contactNumber"
              className="pointer-events-none text-richblack-50 font-semibold text-sm mb-1"
            >
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className="form-style bg-richblack-900 border border-richblack-700 rounded-md py-3 px-4 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition"
              {...register("contactNumber", {
                required: {
                  value: true,
                  message: "Please enter your Contact Number.",
                },
                maxLength: { value: 12, message: "Invalid Contact Number" },
                minLength: { value: 10, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="-mt-1 text-[12px] text-yellow-400">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:w-[48%]">
            <label
              htmlFor="about"
              className="pointer-events-none text-richblack-50 font-semibold text-sm mb-1"
            >
              About
            </label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Enter Bio Details"
              className="form-style bg-richblack-900 border border-richblack-700 rounded-md py-3 px-4 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="-mt-1 text-[12px] text-yellow-400">
                Please enter your About.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          className="rounded-md bg-richblack-700 py-2 px-6 font-semibold text-richblack-50 hover:bg-richblack-600 active:bg-richblack-800 transition"
        >
          Cancel
        </button>
        <IconBtn
          type="submit"
          text="Save"
          className="py-2 px-6"
        />
      </div>
    </form>
  </>
);


}