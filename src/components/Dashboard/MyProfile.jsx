import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { formattedDate } from '../../utils/dateFormatter'
// Utility function to format date

import { RiEditBoxLine } from "react-icons/ri"

export default function MyProfile() {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
   return (
  <>
    <h1 className="mb-14 text-3xl font-medium text-richblack-5">
      My Profile
    </h1>

    {/* Profile card */}
    {/* Profile card */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-y-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-8">
  {/* Left: image + name/email */}
  <div className="flex items-center gap-x-4">
    <img
      src={user?.image}
      alt={`profile-${user?.firstName}`}
      className="aspect-square w-[78px] rounded-full object-cover"
    />

    <div className="flex flex-col">
      {/* Name + Edit in one row */}
      <div className="flex items-center gap-x-2">
        <p className="text-lg font-semibold text-richblack-5">
          {user?.firstName + " " + user?.lastName}
        </p>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-x-1 text-richblack-5 hover:text-white font-medium text-sm"
        >
          <RiEditBoxLine className="text-base" />
          <span>Edit</span>
        </button>
      </div>

      {/* Email below */}
      <p className="text-sm text-richblack-300 break-words">
        {user?.email}
      </p>
    </div>
  </div>
</div>



    {/* About section */}
    <div className="my-10 flex flex-col gap-y-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-8">
      <div className="flex items-center justify-between w-full">
        <p className="text-lg font-semibold text-white">About</p>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-x-1 text-richblack-5 hover:text-white font-medium text-sm"
        >
          <RiEditBoxLine className="text-base" />
          <span>Edit</span>
        </button>
      </div>
      <p
        className={`${
          user?.additionalDetails?.about
            ? "text-richblack-5"
            : "text-richblack-400"
        } text-sm font-medium`}
      >
        {user?.additionalDetails?.about ?? "Write Something About Yourself"}
      </p>
    </div>

    {/* Personal details */}
    <div className="my-10 flex flex-col gap-y-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-8">
      <div className="flex items-center justify-between w-full">
        <p className="text-lg font-semibold text-richblack-5">
          Personal Details
        </p>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-x-1 text-richblack-5 hover:text-white font-medium text-sm"
        >
          <RiEditBoxLine className="text-base" />
          <span>Edit</span>
        </button>
      </div>

      {/* Two-column details that stack on small screens */}
      <div className="flex flex-col md:flex-row w-full max-w-[700px] justify-between gap-y-6 md:gap-x-10">
        <div className="flex flex-col gap-y-5 w-full md:w-1/2">
          <div>
            <p className="mb-2 text-sm text-richblack-600">First Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.firstName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Email</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.email}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Gender</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-5 w-full md:w-1/2">
          <div>
            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.lastName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
            <p className="text-sm font-medium text-richblack-5">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
            <p className="text-sm font-medium text-richblack-5">
              {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                "Add Date Of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);


}