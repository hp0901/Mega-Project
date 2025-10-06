const BASE_URL = "https://mega-project-bs9q.onrender.com" || "http://localhost:4000";

// AUTH ENDPOINTS
export const endpoints = { // Changed to authEndpoints for clarity
    SENDOTP_API: BASE_URL + "/api/v1/auth/sendotp",
    SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
    LOGIN_API: BASE_URL + "/api/v1/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/api/v1/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/api/v1/auth/reset-password",
    GOOGLE_LOGIN_API : BASE_URL + "/api/v1/auth/googlelogin",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/api/v1/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/api/v1/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/api/v1/profile/instructorDashboard",
    UPDATE_PROFILE_API: BASE_URL + "/api/v1/profile/updateProfile", //Added /api/v1
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/api/v1/profile/updateDisplayPicture", //Added /api/v1
    DELETE_PROFILE_API: BASE_URL + "/api/v1/profile/deleteProfile", //Added /api/v1
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/api/v1/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/api/v1/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/api/v1/payment/sendPaymentSuccessEmail",
};

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/api/v1/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/api/v1/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/api/v1/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/api/v1/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/api/v1/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/api/v1/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/api/v1/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/api/v1/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/api/v1/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/api/v1/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/api/v1/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/api/v1/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/api/v1/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/api/v1/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/api/v1/course/createRating",
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/api/v1/course/getReviews",
};

// CATAGORIES API  (Typo corrected)
export const categories = { //changed to categoriesEndpoints
    CATEGORIES_API: BASE_URL + "/api/v1/course/showAllCategories",
};

// CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/api/v1/reach/contact",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/api/v1/profile/updateDisplayPicture",  // Corrected
    UPDATE_PROFILE_API: BASE_URL + "/api/v1/profile/updateProfile",        // Corrected
    CHANGE_PASSWORD_API: BASE_URL + "/api/v1/auth/changepassword",      // Corrected
    DELETE_PROFILE_API: BASE_URL + "/api/v1/profile/deleteProfile",        // Corrected
};