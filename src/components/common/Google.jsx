import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setToken, setUser, setLoading } from "../../slices/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setUser as setProfileUser } from "../../slices/profileSlice";

const GOOGLE_LOGIN_API = "https://mega-project-bs9q.onrender.com/api/v1/auth/googlelogin";

function LoginButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleSuccess = async (credentialResponse) => {
  try {
    const token = credentialResponse.credential;
    if (!token) throw new Error("No ID token received");

    dispatch(setLoading(true));
    const toastId = toast.loading("Logging in with Google...");

    const response = await axios.post(GOOGLE_LOGIN_API, { token }, { withCredentials: true });

    if (response.data.success) {
      const user = response.data.user;
      const token = response.data.token;

      console.log("GOOGLE LOGIN RESPONSE:", response.data);

      // ✅ Update Redux state in both slices
      dispatch(setUser(user));         // from authSlice
      dispatch(setToken(token));       // from authSlice
      dispatch(setProfileUser(user));

      // ✅ Persist to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }

    toast.success("Google login successful");
    navigate("/");
    toast.dismiss(toastId);
  } catch (err) {
    console.error("Google Login Error:", err.response?.data || err.message);
    toast.error("Google login failed");
  } finally {
    dispatch(setLoading(false));
  }
};

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google login failed")}
      // flow="auth-code" // uses redirect instead of popup
      />
  );
}

export default LoginButton;
