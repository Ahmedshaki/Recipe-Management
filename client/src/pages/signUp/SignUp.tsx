import "./signUp.css";
import { countryStateData } from "../../mock_data/countryStateData";
import { FormData } from "../../types/userRegistrationFields.types";
import { handelApiSubmit } from "../../services/apiService";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export const SignUp = () => {
  const [countryChange, setCountryChange] = useState<string>("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [passWordType, setPassWordType] = useState<string>("password");
  const [confirmPassMessage, setConfirmPassMessage] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    state: "",
    password: "",
  });

  const handelChanges = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelCountryChange = (e: any) => {
    const selectedCountry = e.target.value;
    setCountryChange(selectedCountry);
    handelChanges(e);
    const result = countryStateData.find(
      (element) => element.country === selectedCountry
    );
    setSelectedStates(result?.states ?? []);

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      state: "",
    }));
  };

  const handelPasswordHover = () => {
    setPassWordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleMouseLeave = () => {
    setPassWordType("password");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      country: "",
      state: "",
      password: "",
    });

    setConfirmPassword("");
    setConfirmPassMessage("");
    setCountryChange("");
    setSelectedStates([]);
    setPassWordType("password");
  };

  const handelConfirmPassword = (e: any) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
    if (confirmPass === formData.password || confirmPass.length === 0) {
      setConfirmPassMessage("");
    } else {
      setConfirmPassMessage("Password is not matching");
    }
  };

  const handelSubmitData = async () => {
    try {
      const response = await handelApiSubmit("/signup", "POST", formData);
      showSuccessToast(response.data?.message);
      resetForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorToast(error.response?.data?.message || "Something went wrong");
      } else {
        showErrorToast("An unexpected error occurred");
      }
    }
  };
  return (
    <>
      <div className="signUp-container">
        <div className="signup-box">
          <h2 className="signup-title">Create Your Account</h2>
          <div className="signup-fields-container">
            <div className="fields-of-user">
              <label htmlFor="name">Name</label>
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handelChanges}
                />
                <span>
                  <PersonIcon />
                </span>
              </div>
            </div>
            <div className="fields-of-user">
              <label htmlFor="email">Email</label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handelChanges}
                />
                <span>
                  <EmailIcon />
                </span>
              </div>
            </div>
            <div className="fields-of-user">
              <label htmlFor="phone">Phone</label>
              <div>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  required
                  value={formData.phone}
                  onChange={handelChanges}
                />
                <span>
                  <PhoneIcon />
                </span>
              </div>
            </div>
            <div className="fields-of-user">
              <label htmlFor="">Gender</label>
              <div>
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handelChanges}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">MALE</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                <span>
                  <WcIcon />
                </span>
              </div>
            </div>
            <div className="fields-of-user">
              <label htmlFor="country">Country</label>
              <div>
                <select
                  name="country"
                  id="country"
                  value={countryChange}
                  onChange={handelCountryChange}
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {countryStateData.map((element, index) => (
                    <option key={index} value={element.country}>
                      {element.country}
                    </option>
                  ))}
                </select>
                <span>
                  <PublicIcon />
                </span>
              </div>
            </div>
            <div className="fields-of-user">
              <label htmlFor="state">State</label>
              <div>
                <select
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handelChanges}
                  disabled={selectedStates.length === 0}
                >
                  {selectedStates?.length == 0 ? (
                    <option value="">Select a country first</option>
                  ) : (
                    <option value="" disabled selected>
                      Select a state
                    </option>
                  )}
                  {selectedStates.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </select>
                <span>
                  <LocationCityIcon />
                </span>
              </div>
            </div>
            <div className="fields-of-user">
              <label htmlFor="password">Password</label>
              <div>
                <input
                  id="password"
                  name="password"
                  type={passWordType}
                  value={formData.password}
                  onChange={handelChanges}
                />
                <span>
                  <button
                    onClick={handelPasswordHover}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    type="button"
                  >
                    {passWordType === "password" ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </button>
                </span>
              </div>
            </div>
            <div className="fields-of-user">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handelConfirmPassword}
                  disabled={formData.password.length === 0}
                  placeholder={
                    formData.password.length === 0
                      ? "Enter your password above"
                      : "Confirm your password"
                  }
                />
                <span>
                  <VerifiedUserIcon />
                </span>
                <div>
                  {confirmPassMessage === "" ? (
                    ""
                  ) : (
                    <p style={{ color: "red", fontSize: "smaller" }}>
                      {confirmPassMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button className="btn-submit" onClick={handelSubmitData}>
              SUBMIT
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
