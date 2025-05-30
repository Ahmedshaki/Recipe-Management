import "./verifyEmail.css";
import forgotImage from "../../assets/forgotImage.avif";
import { handelApiSubmit } from "../../services/apiService";
import { validateEmail } from "../../validations/userFieldsValidation";
import { OtpModule } from "../../components/otpComponent/OtpModule";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { SetStateAction, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";

let validEmailFromResponse = "";

export const VerifyEmail :React.FC = () => {
  const[email, setEmail] = useState<string>("");
  const[emailError, setEmailError] = useState<string>("");
  const[loading, setLoading] = useState<boolean>(false);
  const[showOtpModal, setShowOtpModal] = useState<boolean>(false);


  const handelEmail = (e: { target: { value: SetStateAction<string>; }; }) =>{
    setEmail(e.target.value);
    const response = validateEmail(email);
    setEmailError(response);
  }

  const handelVerifySubmit = async() =>{
     try{
      setLoading(true);
      const response = await handelApiSubmit(
        `/forgotPassword`,
        "POST",
        {email}
      );
      setEmail("");
      validEmailFromResponse = response.data?.data;
      showSuccessToast(response.data?.message);
      setTimeout(()=>{
        setShowOtpModal(true);
      },2000);
     }
     catch(error){
      if (axios.isAxiosError(error)) {
        showErrorToast(error.response?.data?.message || "Something went wrong");
      } else {
        showErrorToast("An unexpected error occurred");
      }
     }
     finally{
      setLoading(false);
     }
  }

  const handelOtpSuccess = () =>{
    setShowOtpModal(false);
    console.log("navigate");
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
        <OtpModule
          emailOfUser={validEmailFromResponse}
          onSuccess={handelOtpSuccess}
        />
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
