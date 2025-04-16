import "./login.css";
import loginCoverImg from "../../assets/loginCoverImg.png";
import { apiBaseUrl } from "../../config/apiBaseUrl";
import { handelApiSubmit } from "../../services/apiService";
import { validateEmail, validatePassword } from "../../validations/fields";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { SetStateAction, useState } from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";



export const Login :React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const handelSubmitData = async (e: React.FocusEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await handelApiSubmit(
          `${apiBaseUrl}/login`,
           "POST",
          {
            email: email,
            password: password,
          },
        );
        showSuccessToast(response.data?.message);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          showErrorToast(error.response?.data?.message || "Something went wrong");
        } else {
          showErrorToast("An unexpected error occurred");
        }
      }finally {
        setEmail("");
        setPassword("");
      }
    };

    const handelEmailOfUser = (e: { target: { value: SetStateAction<string>; }; }) =>{
      setEmail(e.target.value)
      const error = validateEmail(email)
      setEmailError(error);
    }

    const handelPasswordOfUser = (e: { target: { value: SetStateAction<string>; }; }) =>{
      setPassword(e.target.value);
      const error = validatePassword(password);
      setPasswordError(error);
    }



  return (
    <>
      <div className="full-page">
        <div className="inner-page">
          <div className="image-container">
            <img
              className="image-of-login"
              src={loginCoverImg}
              alt="loginCoverImage"
            />
          </div>
          <div className="login-container">
            <p className="login-message">LOGIN TO YOUR ACCOUNT </p>
            <div className="login-fields">
              <form className="login-form" autoComplete="on" onSubmit= {handelSubmitData}>
                <div className="input-group">
                  <label htmlFor="Email">Enter your Email</label>
                  <input
                    id="Email"
                    type="email"
                    className="login-text"
                    placeholder="Your email"
                    value = {email}
                    onChange={handelEmailOfUser}
                    onBlur={() => setEmailError(validateEmail(email))}
                    autoComplete="email"
                    required
                  />
                  {emailError === "" ? "" :<p className="error-message">{emailError}</p>}
                </div>

                <div className="input-group">
                  <label htmlFor="Password">Enter your Password</label>
                  <input
                    id="Password"
                    type="password"
                    className="login-text"
                    placeholder="Your password"
                    value = {password}
                    onChange={handelPasswordOfUser}
                    autoComplete="current-password"
                    required
                  />
                  {passwordError === ""? "" : <span><p className="error-message">{passwordError}</p></span>}
                </div>
                <div className="forgot-pass">
                  <a href="#">Forgot Password?</a>
                </div>
                <div className="login-button">
                  <button type="submit" className="sign-in-btn"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
              <div>
                <p className="register">
                  Don't have an account? <a href="#">Register</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};
