import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../services/Operations/courseDetailsAPI'
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementsField from './RequirementField'
import { setStep, setCourse } from '../../../../slices/courseSlice'
import ChipInput from './ChipInput'
import IconBtn from '../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../utils/constants'
import { toast } from 'react-hot-toast';
import Upload from '../Upload'
import { MdNavigateNext } from 'react-icons/md';
import { setLoading } from '../../../../slices/authSlice';
export default function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [localLoading, setLocalLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const [thumbnailFile, setThumbnailFile] = useState(); // File for thumbnail upload

    

    useEffect(() => {
        const getCategories = async () => {
            setLocalLoading(true);
            const categories = await fetchCourseCategories();
            try {
                if (categories.length > 0) setCourseCategories(categories);
            } catch (error) {
                toast.error("Failed to fetch categories");
            } finally {
                setLocalLoading(false);
            }
        };

        // Prefill form if editing
        if (editCourse && course) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag || []);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category?._id || "");
            setValue("courseRequirements", course.instructions || []);
            setValue("courseImage", course.thumbnail );
        }

        getCategories();
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (!course) return true; // New course
        return (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== (course.tag || []).toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category?._id ||
            currentValues.courseRequirements.toString() !== (course.instructions || []).toString() ||
            (thumbnailFile || currentValues.courseImage !== course.thumbnail)
        );
    }

    const onSubmit = async (data) => {
        try {
            setLocalLoading(true);
            const currentValues = getValues()
            const formData = new FormData();

            if (editCourse && course) {
                // Append course ID
                formData.append("courseId", course._id);

                if (currentValues.courseTitle !== course.courseName) formData.append("courseName", data.courseTitle);
                if (currentValues.courseShortDesc !== course.courseDescription) formData.append("courseDescription", data.courseShortDesc);
                if (currentValues.coursePrice !== course.price) formData.append("price", data.coursePrice);
                if (currentValues.courseTags.toString() !== (course.tag || []).toString()) formData.append("tag", JSON.stringify(data.courseTags));
                if (currentValues.courseBenefits !== course.whatYouWillLearn) formData.append("whatYouWillLearn", data.courseBenefits);
                if (currentValues.courseCategory._id !== course.category?._id) formData.append("category", data.courseCategory);
                if (currentValues.courseRequirements.toString() !== (course.instructions || []).toString()) formData.append("instructions", JSON.stringify(data.courseRequirements));
                if (currentValues.courseImage !== course.thumbnail || thumbnailFile) {
                      formData.append("thumbnailImage", data.courseImage)
                      console.log("Thumbnail Image Updated:", data.courseImage);}                
                const result = await editCourseDetails(formData, token);
                if (result) {
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                    toast.success("Course updated successfully!");
                } else {
                    toast.error("Failed to update course.");
                }
            } else {
                // New course
                formData.append("courseName", data.courseTitle);
                formData.append("courseDescription", data.courseShortDesc);
                formData.append("price", data.coursePrice);
                formData.append("whatYouWillLearn", data.courseBenefits);
                formData.append("category", data.courseCategory);
                formData.append("instructions", JSON.stringify(data.courseRequirements));
                formData.append("status", COURSE_STATUS.DRAFT);
                formData.append("tag", JSON.stringify(data.courseTags));
                console.log("Form Data before thumbnail append:", formData);
                console.log("Thumbnail File:", thumbnailFile);
                if (thumbnailFile) {
                formData.append("thumbnailImage", thumbnailFile);
                console.log("Thumbnail appended as File:", thumbnailFile);
                console.log("Form Data after thumbnail append:", formData);
                }
                else {
                toast.error("Thumbnail is required");
                setLocalLoading(false);
                return;
                } 


                console.log("Form Data before submission:", formData);
                setLoading(true)
                const result = await addCourseDetails(formData, token);
                setLoading(false)
                if (result) {
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                    toast.success("Course created successfully!");
                } else {
                    toast.error("Failed to create course.");
                }
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred");
        } finally {
            setLocalLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-lg border border-richblack-700 bg-richblack-800 p-8 shadow-lg transition-all duration-300">
            {/* Course Title */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="courseTitle" className="text-sm text-richblack-5">Course Title <sup className="text-pink-200">*</sup></label>
                <input
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                    className="w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                />
                {errors.courseTitle && <span className="ml-2 text-xs font-medium text-pink-300">Course title is required</span>}
            </div>

            {/* Short Description */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">Course Short Description <sup className="text-pink-200">*</sup></label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc", { required: true })}
                    className="w-full min-h-[130px] resize-none rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                />
                {errors.courseShortDesc && <span className="ml-2 text-xs font-medium text-pink-300">Course Description is required</span>}
            </div>

            {/* Price */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="coursePrice" className="text-sm text-richblack-5">Course Price <sup className="text-pink-200">*</sup></label>
                <div className="relative">
                    <input
                        id="coursePrice"
                        placeholder="Enter Course Price"
                        {...register("coursePrice", { required: true, valueAsNumber: true })}
                        className="w-full rounded-md bg-richblack-700 px-4 py-2 pl-12 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-yellow-400" />
                </div>
                {errors.coursePrice && <span className="ml-2 text-xs font-medium text-pink-300">Course Price is required</span>}
            </div>

            {/* Category */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="courseCategory" className="text-sm text-richblack-5">Course Category <sup className="text-pink-200">*</sup></label>
                <select
                    {...register("courseCategory", { required: true })}
                    id="courseCategory"
                    defaultValue=""
                    className="w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                >
                    <option value="" disabled>Choose a Category</option>
                    {courseCategories.map((c, i) => <option key={i} value={c._id}>{c.name}</option>)}
                </select>
                {errors.courseCategory && <span className="ml-2 text-xs font-medium text-pink-300">Course Category is required</span>}
            </div>

            {/* Tags */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Thumbnail */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
                onFileChange={(file) => setThumbnailFile(file)}
            />

            {/* Benefits */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="courseBenefits" className="text-sm text-richblack-5">Benefits of the course <sup className="text-pink-200">*</sup></label>
                <textarea
                    id="courseBenefits"
                    placeholder="Enter benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    className="w-full min-h-[130px] resize-none rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                />
                {errors.courseBenefits && <span className="ml-2 text-xs font-medium text-pink-300">Benefits of the course is required</span>}
            </div>

            {/* Requirements */}
            <RequirementsField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-x-3 pt-4">
                {editCourse && (
                    <button
                        type="button"
                        onClick={() => dispatch(setStep(2))}
                        disabled={localLoading}
                        className={`flex items-center gap-x-2 rounded-lg bg-richblack-300 px-5 py-2 text-sm font-semibold text-richblack-900 transition-all duration-300
                            ${localLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-richblack-200"}`}
                    >
                        Continue Without Saving
                    </button>
                )}
                <IconBtn
                    type="submit"
                    className={`flex items-center gap-x-2 rounded-lg bg-yellow-400 px-5 py-2 text-sm font-semibold text-richblack-900 transition-all duration-300
                        ${localLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300 hover:scale-[1.02]"}`}
                    disabled={localLoading}
                >
                    {!editCourse ? "Next" : "Save Changes"}
                    <MdNavigateNext className="text-lg" />
                </IconBtn>
            </div>
        </form>
    )
}
