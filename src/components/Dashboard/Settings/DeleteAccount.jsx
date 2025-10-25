import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProfile } from "../../../services/Operations/SettingsAPI"; // Adjust this import path as needed

// Confirmation Modal Component
function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  // Render nothing if the modal is not open
  if (!isOpen) return null;

  return (
    // Backdrop: Covers the screen, centers content, blurs background
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      {/* Modal Content Box: Defines size, background, padding, and layout */}
      <div className="w-11/12 max-w-[370px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 flex flex-col gap-y-4">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-richblack-5">{title}</h2>
        {/* Message */}
        <p className="text-richblack-200">{message}</p>
        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-x-4">
          {/* Delete Button */}
          <button
            onClick={onConfirm}
            className="rounded-md bg-pink-600 hover:bg-pink-700 py-2 px-5 font-semibold text-white transition-all duration-200"
          >
            Delete
          </button>
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="rounded-md bg-richblack-300 hover:bg-richblack-400 py-2 px-5 font-semibold text-richblack-900 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Delete Account Component
export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function called when the user confirms deletion in the modal
  async function confirmDelete() {
    try {
      // Dispatch the delete action
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    } finally {
      // Always close the modal afterwards
      setIsModalOpen(false);
    }
  }

  // Function called when the "I want to delete..." button is clicked
  function handleDeleteRequest() {
    // Open the confirmation modal
    setIsModalOpen(true);
  }

  return (
    <>
      {/* Delete Account Section: Main container with padding, border, background */}
      <div className="my-10 flex flex-col sm:flex-row gap-x-5 rounded-md border border-pink-700 bg-pink-900 p-6 sm:p-8 sm:px-12">
        {/* Icon Container: Ensures icon doesn't shrink */}
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 mb-4 sm:mb-0 shrink-0">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        {/* Text Content & Button Container */}
        <div className="flex flex-col gap-y-2">
          {/* Section Title */}
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          {/* Warning Text: Responsive width */}
          <div className="w-full sm:w-4/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
          {/* Delete Request Button */}
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300 hover:text-pink-400 transition-all duration-200 mt-2"
            onClick={handleDeleteRequest} // Opens the modal
          >
            I want to delete my account.
          </button>
        </div>
      </div>

      {/* Confirmation Modal: Rendered conditionally based on state */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Pass function to close modal
        onConfirm={confirmDelete} // Pass function to confirm deletion
        title="Are you sure?"
        message="Deleting your account is permanent and cannot be undone. All associated data, including purchased courses, will be lost."
      />
    </>
  );
}