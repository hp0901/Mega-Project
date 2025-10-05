import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../services/Operations/profileAPI';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log('Unable to Fetch Enrolled Courses');
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, [])

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
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <p className="font-semibold">Course Name</p>
                            <p className="font-semibold">Duration</p>
                            <p className="font-semibold">Progress</p>
                        </div>
                        {enrolledCourses.map((course, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 border-b border-gray-700 py-4">
                                <div className="flex items-center">
                                    <img src={course.thumbnail} alt="course thumbnail" className="w-20 h-16 object-cover rounded mr-4" />
                                    <div>
                                        <p className="font-semibold">{course.courseName}</p>
                                        <p className="text-sm text-gray-400">{course.courseDescription}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <p>{course?.totalDuration}</p>
                                </div>
                                <div className="flex items-center justify-center">
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
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default EnrolledCourses;