import "./otpModule.css";
import { handelApiSubmit } from "../../services/apiService";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { otpModuleProps } from "../../types/OtpModule/otpModuleProps";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


let OTP_DIGIT_COUNT = 4;


export const OtpModule:React.FC<otpModuleProps> = ({emailOfUser, onSuccess}) => {
  const [inputArray, setInputArray] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
  const refArr = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handelInputChange = (value: any, index: number) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArray = [...inputArray];
    newArray[index] = newValue.slice(-1);
    setInputArray(newArray);
    newValue && refArr.current[index + 1]?.focus();
  };

  const handelOnKeyDown = (e: any, index: number) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  const handelSubmitOtp = async() =>{
    let newOtpString = inputArray.join("");
    try{
        const response = await handelApiSubmit(
          `/verifyOtp`,
          "POST",
          { 
            email: emailOfUser, 
            otp: newOtpString
          }
        );
        showSuccessToast(response.data?.message);
        onSuccess();
    }
    catch(error : unknown){
      if(axios.isAxiosError(error)){
        showErrorToast(error.response?.data?.message);
      }
    }finally{
      setInputArray(new Array(OTP_DIGIT_COUNT).fill(""));
    }
  }

  return (
    <div className="otp-module-overlay">
      <div className="otp-field">
        <h1>Validate OTP</h1>
        {inputArray.map((input, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            name="otp"
            type="text"
            className="otp-input"
            value={inputArray[index]}
            ref={(input) => {
              refArr.current[index] = input;
            }}
            onChange={(e) => handelInputChange(e.target.value, index)}
            onKeyDown={(e) => handelOnKeyDown(e, index)}
            maxLength={1}
          />
        ))}
        <div className="verify-otp">
        <button  
        className="verify-otp-btn"
        onClick={handelSubmitOtp}
        >Verify OTP</button>
        </div>
      </div>
    </div>
  );
};
