import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { setSignupData } from '../../slices/authSlice'
import { sendOtp } from '../../services/Operations/authAPI'
import { useNavigate, Link } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import Tab from '../common/Tab';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

function SignupForm()  {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formdata, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showconfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formdata;

  const handleOnChange = (e) => {
    setFromData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return
    }

    const signupData = {
      ...formdata,
      accountType,
    }
    console.log("Signup data is ", signupData);
    console.log("Email is ", formdata.email);
    // store signup data temporarily until OTP verification
    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formdata.email, formdata.firstName, formdata.lastName,navigate))

    // reset form
    setFromData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR }
  ]

  return (
    <div>
      {/* Account Type Tabs */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* Signup Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          {/* First Name */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>

          {/* Last Name */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>

        {/* Email */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        {/* Passwords */}
        <div className="flex gap-x-4">
          {/* Password */}
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          {/* Confirm Password */}
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showconfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showconfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-300"
        >
          Create Account
        </button>
      </form>

      {/* Login Redirect */}
      <p className="mt-6 text-center text-sm text-richblack-100">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-yellow-50 hover:text-yellow-100 transition-all duration-300"
        >
          Login here 🚀
        </Link>
      </p>
    </div>
  )
}

export default SignupForm
