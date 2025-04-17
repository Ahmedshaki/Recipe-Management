import './resetPassword.css';
import resetPasswordImage from "../../assets/resetPasswordImage.jpg";

export const ResetPassword = () => {
  return (
    <div className="full-Container">
      <div className="left-container">
        <div className="image-container">
          <img
            src={resetPasswordImage}
            alt="Reset-Password-Image"
            className="Reset-Password-Image"
          />
        </div>
      </div>
      <div className="right-container">
        <div className="right-field-container">
          <div className="title-of-field">
            <h1>RESET YOUR PASSWORD</h1>
          </div>
          <div className="password-info-container">
            <p>Enter a strong password which should contain:</p>
            <div className="password-info-list">
              <ul>
                <li>At least 9 characters</li>
                <li>At least one uppercase letter (A-Z)</li>
                <li>At least one lowercase letter (a-z)</li>
                <li>At least one number (0-9)</li>
                <li>At least one special character (!@#$%^&*)</li>
              </ul>
            </div>
          </div>
          <div className="fields-of-user">
            <div className="password-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <div>
                <p>Enter a valid password</p>
            </div>
            <div className="confirm-password-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" />
            </div>
            <div><p>Enter a valid password</p></div>
          </div>
          <div className="save-button-container">
            <button className="button-to-save">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
