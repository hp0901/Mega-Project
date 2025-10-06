import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import ReactPlayer from "react-player";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
  onFileChange,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(viewData || editData || "");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setSelectedFile(file);
    setValue(name, file);

    if (onFileChange) onFileChange(file);

    if (!video) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setPreviewSource(reader.result);
    } else {
      const videoURL = URL.createObjectURL(file);
      setPreviewSource(videoURL);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? { "video/mp4": [".mp4"], "video/webm": [".webm"], "video/quicktime": [".mov"] }
      : { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewSource("");
    setValue(name, null);
    if (onFileChange) onFileChange(null);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        {...getRootProps()}
        className={`flex min-h-[250px] w-full flex-col items-center justify-center rounded-md border-2 border-dotted border-richblack-500 ${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        }`}
      >
        <input {...getInputProps()} />

        {previewSource ? (
          <div className="flex w-full flex-col p-4">
            {!video ? (
              <img src={previewSource} alt="Preview" className="w-full h-auto rounded-md object-cover" />
            ) : (
              <ReactPlayer url={previewSource} controls width="100%" height="auto" />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={handleCancel}
                className="mt-2 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6 text-center">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800 mb-4">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"} here, or click{" "}
              <span className="font-semibold text-yellow-50">Browse</span>
            </p>
            <ul className="mt-4 flex justify-center gap-6 text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required</span>
      )}
    </div>
  );
}
