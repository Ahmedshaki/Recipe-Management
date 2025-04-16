import "./verifyEmail.css";
import forgotImage from "../../assets/forgotImage.avif";
import { handelApiSubmit } from "../../services/apiService";
import { validateEmail } from "../../validations/fields";
import { OtpModule } from "../../components/otpComponent/OtpModule";
import { SetStateAction, useState } from "react";
import { ToastContainer } from "react-toastify";

export const VerifyEmail :React.FC = () => {
  const[email, setEmail] = useState<string>("");
  const[emailError, setEmailError] = useState<string>("");
  const[loading, setLoading] = useState<boolean>(false);
  const[showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handelEmail = (e: { target: { value: SetStateAction<string>; }; }) =>{
    setEmail(e.target.value);
    const response = validateEmail(email);
    setEmailError(response);
  }

  const handelVerifySubmit = async() =>{
     try{
      setLoading(true);
      await handelApiSubmit(
        `${apiBaseUrl}/forgotPassword`,
        "POST",
        {email}
      );
      setEmail("");
      setTimeout(()=>{
        setShowOtpModal(true);
      },2000);
     }
     catch(error){
      console.error("Error during form submission:", error);
     }
     finally{
      setLoading(false);
     }
  }

  return (
    <>
      {loading && (
        <div className="fullscreen-loader">
          <div className="spinner" />
          <p className="loading-text">Sending OTP...</p>
        </div>
      )}
      {showOtpModal && (
        <OtpModule/>
      )}
      <div className="verify-page">
        <div className="left-page">
          <div className="image-container">
            <img
              src={forgotImage}
              alt="image-of-forgot"
              className="image-verify"
            />
          </div>
        </div>
        <div className="right-page">
          <div className="field-details">
            <h1 className="title">Forgot Your Password?</h1>
            <p className="info-message">
              Don't worry, it happens. Please enter the email address associated
              with your account.
            </p>
            <div className="input-field">
              <input
                id="forgot-email"
                type="email"
                className="text-input"
                placeholder="Your email"
                value={email}
                onChange={handelEmail}
                required
              />
              <div className="error-container">
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
            </div>
            <div className="input-field-btn">
              <button className="button-verify" onClick={handelVerifySubmit}>
                Verify yourself
              </button>
            </div>
            <div className="input-field">
              <p>
                <a href="#">Back to login page</a>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
