import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../services/Operations/profileAPI';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getEnrolledCourses = async () => {
            try {
                const response = await getUserEnrolledCourses(token);
                const filterPublishCourse = response.filter((ele) => ele.status !== "Draft");
                setEnrolledCourses(filterPublishCourse);
            } catch (error) {
                console.log('Unable to Fetch Enrolled Courses');
            }
        };
        getEnrolledCourses();
    }, [token]);

    return (
        <div className="text-white p-4">
            <div className="text-2xl font-semibold mb-4">Enrolled Courses</div>
            {
                !enrolledCourses ? (
                    <div className="text-center">Loading...</div>
                ) : !enrolledCourses.length ? (
                    <p className="text-center">You have not enrolled in any course yet</p>
                ) : (
                    <div>
                        {/* --- Desktop/Tablet Headers --- */}
                        {/* Hidden on small screens, grid on medium and up */}
                        <div className="hidden md:grid md:grid-cols-[minmax(0,_2fr)_1fr_1fr] gap-4 mb-4 font-semibold p-4 rounded-lg bg-richblack-700">
                            <p>Course Name</p>
                            <p className="text-center">Duration</p>
                            <p className="text-center">Progress</p>
                        </div>

                        {/* --- Course List --- */}
                        {/* Stacks on mobile, no gap on desktop */}
                        <div className="flex flex-col gap-4 md:gap-0">
                            {enrolledCourses.map((course) => {
                                
                                // --- Safe Navigation Logic ---
                                // Prevents "undefined" in URL if course has no content
                                const firstSection = course?.courseContent?.[0] || 0;
                                const firstSubSection = firstSection?.subSection?.[0] || 0;

                                const handleNavigation = () => {
                                    if (firstSection ) {
                                        navigate(
                                            `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSubSection._id}`
                                        );
                                    } 
                                };

                                return (
                                    <div
                                        className={`
                                            flex flex-col md:grid md:grid-cols-[minmax(0,_2fr)_1fr_1fr] 
                                            border border-richblack-700 
                                            rounded-lg md:rounded-none // Rounded card on mobile, sharp row on desktop
                                            p-4 md:p-0 // Padding for mobile card, no padding for desktop row
                                        `}
                                        key={course._id} // --- FIX: Use stable key ---
                                    >

                                        {/* --- Column 1: Course Info --- */}
                                        <div
                                            className="flex cursor-pointer items-center gap-4 md:p-4"
                                            onClick={handleNavigation}
                                        >
                                            <img
                                                src={course.thumbnail}
                                                alt="course thumbnail"
                                                className="w-20 h-16 object-cover rounded"
                                            />
                                            <div className="flex-grow">
                                                <p className="font-semibold">{course.courseName}</p>
                                                <p className="text-sm text-gray-400">{course.courseDescription}</p>
                                            </div>
                                        </div>

                                        {/* --- Column 2: Duration --- */}
                                        <div className="flex justify-between items-center mt-4 md:mt-0 md:justify-center md:p-4">
                                            {/* Mobile-only Label */}
                                            <p className="font-semibold md:hidden">Duration:</p>
                                            <p>{course?.totalDuration}</p>
                                        </div>

                                        {/* --- Column 3: Progress --- */}
                                        <div className="flex justify-between items-center mt-4 md:mt-0 md:justify-center md:p-4">
                                            {/* Mobile-only Label */}
                                            <p className="font-semibold md:hidden">Progress:</p>
                                            <div className="w-20 h-20">
                                                <CircularProgressbar
                                                    value={course.progressPercentage || 0}
                                                    text={`${course.progressPercentage || 0}%`}
                                                    styles={buildStyles({
                                                        rotation: 0.25,
                                                        strokeLinecap: 'butt',
                                                        textSize: '16px',
                                                        pathTransitionDuration: 0.5,
                                                        pathColor: `rgba(62, 152, 199, ${course.progressPercentage / 100})`,
                                                        textColor: '#f88',
                                                        trailColor: '#d6d6d6',
                                                        backgroundColor: '#3e98c7',
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default EnrolledCourses;