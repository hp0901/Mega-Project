import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { createSubSection, updateSubSection } from '../../../../services/Operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import IconBtn from '../../../common/IconBtn';
import Upload from '../Upload';

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch();
  // const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, [view, edit, setValue, modalData.title, modalData.description, modalData.videoUrl]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      videoFile // if user selected a new video
    );
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    if (currentValues.lectureTitle !== modalData.title) formData.append("title", currentValues.lectureTitle);
    if (currentValues.lectureDesc !== modalData.description) formData.append("description", currentValues.lectureDesc);
    if (videoFile) formData.append("video", videoFile);

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) dispatch(setCourse(result));
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
      } else {
        await handleEditSubSection();
      }
      return;
    }

    // ADD new subsection
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    if (videoFile) formData.append("video", videoFile);

    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) dispatch(setCourse(result));
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg bg-richblack-800 p-6 shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-lg font-semibold text-richblack-5">
          {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
        </p>
        <button onClick={() => (!loading ? setModalData(null) : {})} className="text-richblack-300 hover:text-pink-200 transition">
          <RxCross1 className="text-xl" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Video Upload */}
        <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
          viewData={view ? modalData.videoUrl : null}
          editData={edit ? modalData.videoUrl : null}
          onFileChange={(file) => setVideoFile(file)}
        />

        {/* Lecture Title */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="lectureTitle" className="text-sm text-richblack-5">
            Lecture Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="lectureTitle"
            placeholder="Enter Lecture Title"
            {...register("lectureTitle", { required: true })}
            className="w-full rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
          />
          {errors.lectureTitle && <span className="text-xs text-pink-300">Lecture Title is required</span>}
        </div>

        {/* Lecture Description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="lectureDesc" className="text-sm text-richblack-5">
            Lecture Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="lectureDesc"
            placeholder="Enter Lecture Description"
            {...register("lectureDesc", { required: true })}
            className="w-full min-h-[130px] resize-none rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
          />
          {errors.lectureDesc && <span className="text-xs text-pink-300">Lecture Description is required</span>}
        </div>

        {/* Submit Button */}
        {!view && (
          <div className="flex justify-end">
            <IconBtn
              className={`flex items-center gap-x-2 rounded-md bg-yellow-400 px-6 py-2 text-sm font-semibold text-richblack-900 transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300 hover:scale-[1.02]"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : edit ? "Save Changes" : "Save"}
            </IconBtn>
          </div>
        )}
      </form>
    </div>
  );
};

export default SubSectionModal;
