import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'; // Import toast
import { changePassword } from '../../../services/Operations/SettingsAPI'; // Adjust the path if needed
import IconBtn from "../../common/IconBtn"; // Adjust the path if needed

export default function UpdatePassword() {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setshowConfirmNewPassword] = useState(false); // Corrected variable name

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, // Destructure isSubmitting
        watch, // Destructure watch
        reset
    } = useForm({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

      // Function to validate confirm password
    const validateConfirmPassword = (value) => {
        const newPasswordValue = watch("newPassword");
        if (!value) {
            return "Confirm New Password is required";
        }
        if (value !== newPasswordValue) {
            return "Passwords do not match";
        }
        return true;
    };

    const submitPasswordForm = async (data) => {
        if (isSubmitting) return; // Prevent multiple submissions
        const toastId = toast.loading("Updating Password..."); // Show loading toast

        try {
            await changePassword(token, data);
            toast.success("Password updated successfully!"); // Show success toast
            reset(); // Reset the form fields after successful update
            navigate("/dashboard/my-profile"); // Redirect to profile
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Failed to update password. Please try again.";
            toast.error(errorMessage); // Show error toast with a more user-friendly message
            console.error("ERROR MESSAGE - ", error); // Keep the console log for detailed error information
        } finally {
            toast.dismiss(toastId); // Dismiss the loading toast
        }
    };

    return (
  <div className="w-full">
    <form onSubmit={handleSubmit(submitPasswordForm)} className="w-full">
      <div className="my-10 flex flex-col gap-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 sm:p-12 shadow-md">
        <h2 className="text-xl font-semibold text-richblack-5 border-b border-richblack-700 pb-3">
          Password
        </h2>

        <div className="flex flex-col gap-8 lg:flex-row w-full">
          {/* Current Password */}
          <div className="relative flex flex-col gap-3 lg:w-[48%]">
            <label
              htmlFor="oldPassword"
              className="text-richblack-50 font-semibold text-sm mb-1"
            >
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter Current Password"
              className="form-style bg-richblack-900 border border-richblack-700 rounded-md py-3 px-4 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition"
              {...register("oldPassword", {
                required: "Current Password is required",
              })}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[60%] z-[10] cursor-pointer text-richblack-400 hover:text-yellow-400 transition"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-400">
                {errors.oldPassword.message}
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="relative flex flex-col gap-3 lg:w-[48%]">
            <label
              htmlFor="newPassword"
              className="text-richblack-50 font-semibold text-sm mb-1"
            >
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter New Password"
              className="form-style bg-richblack-900 border border-richblack-700 rounded-md py-3 px-4 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition"
              {...register("newPassword", {
                required: "New Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[60%] z-[10] cursor-pointer text-richblack-400 hover:text-yellow-400 transition"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-400">
                {errors.newPassword.message}
              </span>
            )}
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="relative flex flex-col gap-3 lg:w-[48%] mt-6">
          <label
            htmlFor="confirmNewPassword"
            className="text-richblack-50 font-semibold text-sm mb-1"
          >
            Confirm New Password
          </label>
          <input
            type={showConfirmNewPassword ? "text" : "password"}
            name="confirmNewPassword"
            id="confirmNewPassword"
            placeholder="Confirm New Password"
            className="form-style bg-richblack-900 border border-richblack-700 rounded-md py-3 px-4 text-richblack-50 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 shadow-sm transition"
            {...register("confirmNewPassword", {
              required: "Confirm New Password is required",
              validate: validateConfirmPassword,
            })}
          />
          <span
            onClick={() => setshowConfirmNewPassword((prev) => !prev)}
            className="absolute right-3 top-[60%] z-[10] cursor-pointer text-richblack-400 hover:text-yellow-400 transition"
          >
            {showConfirmNewPassword ? (
              <AiOutlineEyeInvisible fontSize={24} />
            ) : (
              <AiOutlineEye fontSize={24} />
            )}
          </span>
          {errors.confirmNewPassword && (
            <span className="-mt-1 text-[12px] text-yellow-400">
              {errors.confirmNewPassword.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          className="rounded-md bg-richblack-700 py-2 px-6 font-semibold text-richblack-50 hover:bg-richblack-600 active:bg-richblack-800 transition"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update" className="py-2 px-6" disabled={isSubmitting} />
      </div>
    </form>
  </div>
);

}