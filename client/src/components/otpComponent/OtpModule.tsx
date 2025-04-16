import { useEffect, useRef, useState } from "react";
import "./otpModule.css";

let OTP_DIGIT_COUNT = 4;

export const OtpModule = () => {
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
      </div>
    </div>
  );
};
