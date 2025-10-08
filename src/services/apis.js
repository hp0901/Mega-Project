// ======================== AUTH ENDPOINTS ========================
export const endpoints = {
  SENDOTP_API: "https://mega-project-bs9q.onrender.com/api/v1/auth/sendotp",
  SIGNUP_API: "https://mega-project-bs9q.onrender.com/api/v1/auth/signup",
  LOGIN_API: "https://mega-project-bs9q.onrender.com/api/v1/auth/login",
  RESETPASSTOKEN_API: "https://mega-project-bs9q.onrender.com/api/v1/auth/reset-password-token",
  RESETPASSWORD_API: "https://mega-project-bs9q.onrender.com/api/v1/auth/reset-password",
  GOOGLE_LOGIN_API: "https://mega-project-bs9q.onrender.com/api/v1/auth/googlelogin",
};

// ======================== PROFILE ENDPOINTS ========================
export const profileEndpoints = {
  GET_USER_DETAILS_API: "https://mega-project-bs9q.onrender.com/api/v1/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: "https://mega-project-bs9q.onrender.com/api/v1/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: "https://mega-project-bs9q.onrender.com/api/v1/profile/instructorDashboard",
  UPDATE_PROFILE_API: "https://mega-project-bs9q.onrender.com/api/v1/profile/updateProfile",
  UPDATE_DISPLAY_PICTURE_API: "https://mega-project-bs9q.onrender.com/api/v1/profile/updateDisplayPicture",
  DELETE_PROFILE_API: "https://mega-project-bs9q.onrender.com/api/v1/profile/deleteProfile",
};

// ======================== STUDENT ENDPOINTS ========================
export const studentEndpoints = {
  COURSE_PAYMENT_API: "https://mega-project-bs9q.onrender.com/api/v1/payment/capturePayment",
  COURSE_VERIFY_API: "https://mega-project-bs9q.onrender.com/api/v1/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: "https://mega-project-bs9q.onrender.com/api/v1/payment/sendPaymentSuccessEmail",
};

// ======================== COURSE ENDPOINTS ========================
export const courseEndpoints = {
  GET_ALL_COURSE_API: "https://mega-project-bs9q.onrender.com/api/v1/course/getAllCourses",
  COURSE_DETAILS_API: "https://mega-project-bs9q.onrender.com/api/v1/course/getCourseDetails",
  EDIT_COURSE_API: "https://mega-project-bs9q.onrender.com/api/v1/course/editCourse",
  COURSE_CATEGORIES_API: "https://mega-project-bs9q.onrender.com/api/v1/course/showAllCategories",
  CREATE_COURSE_API: "https://mega-project-bs9q.onrender.com/api/v1/course/createCourse",
  CREATE_SECTION_API: "https://mega-project-bs9q.onrender.com/api/v1/course/addSection",
  CREATE_SUBSECTION_API: "https://mega-project-bs9q.onrender.com/api/v1/course/addSubSection",
  UPDATE_SECTION_API: "https://mega-project-bs9q.onrender.com/api/v1/course/updateSection",
  UPDATE_SUBSECTION_API: "https://mega-project-bs9q.onrender.com/api/v1/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: "https://mega-project-bs9q.onrender.com/api/v1/course/getInstructorCourses",
  DELETE_SECTION_API: "https://mega-project-bs9q.onrender.com/api/v1/course/deleteSection",
  DELETE_SUBSECTION_API: "https://mega-project-bs9q.onrender.com/api/v1/course/deleteSubSection",
  DELETE_COURSE_API: "https://mega-project-bs9q.onrender.com/api/v1/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: "https://mega-project-bs9q.onrender.com/api/v1/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: "https://mega-project-bs9q.onrender.com/api/v1/course/updateCourseProgress",
  CREATE_RATING_API: "https://mega-project-bs9q.onrender.com/api/v1/course/createRating",
};

// ======================== RATINGS AND REVIEWS ========================
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: "https://mega-project-bs9q.onrender.com/api/v1/course/getReviews",
};

// ======================== CATEGORIES API ========================
export const categoriesEndpoints = {
  CATEGORIES_API: "https://mega-project-bs9q.onrender.com/api/v1/course/showAllCategories",
};

// ======================== CATALOG PAGE DATA ========================
export const catalogData = {
  CATALOGPAGEDATA_API: "https://mega-project-bs9q.onrender.com/api/v1/course/getCategoryPageDetails",
};

// ======================== CONTACT-US API ========================
export const contactusEndpoint = {
  CONTACT_US_API: "https://mega-project-bs9q.onrender.com/api/v1/reach/contact",
};

// ======================== SETTINGS PAGE API ========================
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: "https://mega-project-bs9q.onrender.com/api/v1/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: "https://mega-project-bs9q.onrender.com/api/v1/profile/updateprofile",
  CHANGE_PASSWORD_API: "https://mega-project-bs9q.onrender.com/api/v1/auth/changepassword",
  DELETE_PROFILE_API: "https://mega-project-bs9q.onrender.com/api/v1/profile/deleteProfile",
};
