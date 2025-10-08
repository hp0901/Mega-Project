import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../services/Operations/authAPI';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoginButton from '../common/Google';

function LoginForm() {

  const navigate = useNavigate("/");
  const dispatch = useDispatch();

  const [formdata, setformData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formdata;

  const handleOnChange = (e) =>
    setformData({ ...formdata, [e.target.name]: e.target.value });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div>
      <form
        onSubmit={handleOnSubmit}
        className="mt-6 flex w-full flex-col gap-y-4"
      >
        {/* Email Field */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        {/* Password Field */}
        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>

          {/* Forgot Password */}
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 hover:text-blue-200 transition-all duration-300">
              Forgot Password?
            </p>
          </Link>
        </label>

        {/* Divider */}
        <div className="flex w-full items-center gap-x-2 my-4">
          <div className="h-[1px] w-full bg-richblack-300"></div>
          <p className="text-richblack-300">or</p>
          <div className="h-[1px] w-full bg-richblack-300"></div>
        </div>

        {/* Google Login Button */}
        <LoginButton />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-300"
        >
          Sign In
        </button>
      </form>

      {/* Signup Redirect */}
      <p className="mt-6 text-center text-sm text-richblack-100">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-yellow-50 hover:text-yellow-100 transition-all duration-300"
        >
          Create one now ✨
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
