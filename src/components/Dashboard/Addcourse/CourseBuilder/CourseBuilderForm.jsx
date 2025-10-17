import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn'
import { MdAddCircleOutline } from "react-icons/md"
import { BiRightArrow } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../../services/Operations/courseDetailsAPI'
import NestedView from './NestedView';


const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [ loading ,setLoading] = useState(false);

  useEffect(() => {
    console.log("Course updated", course);
  }, [course]);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      // Editing existing section
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }, token);
    } else {
      // Creating new section
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token);
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if (course?.courseContent?.length === 0) {
      toast.error("Please add at least one Section");
      return;
    }
    // optionally check if every section has lectures
    // if (course.courseContent.some(s => s.subSection.length === 0)) { ... }
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className="w-full max-w-4xl mx-auto text-white space-y-8">
      <p className="text-2xl font-bold text-richblack-5">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="sectionName" className="text-sm text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
          />
          {errors.sectionName && (
            <span className="text-xs text-pink-300">Section Name is required</span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses="text-white"
          >
            <MdAddCircleOutline className="text-yellow-50" size={20} />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Section and Lecture View */}
      {course?.courseContent?.length > 0 && (
        <div className="pt-6">
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        </div>
      )}

      <div className="mt-10 flex justify-end gap-3">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-2 rounded-md bg-richblack-300 px-5 py-2 text-sm font-semibold text-richblack-900 transition-all duration-300 hover:bg-richblack-200"
        >
          Back
        </button>

        <IconBtn
          text="Next"
          onclick={goToNext}
          className="flex items-center gap-2 rounded-md bg-yellow-400 px-6 py-2 text-sm font-semibold text-richblack-900 transition-all duration-300 hover:bg-yellow-300 hover:scale-[1.02]"
        >
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  );
}

export default CourseBuilderForm
