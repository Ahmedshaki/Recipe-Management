import "./login.css";
import loginCoverImg from "../../assets/loginCoverImg.png";
import axios from "axios";

export const Login :React.FC = () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    
    const postDataToServer = async() =>{
        const response = await axios.post(`${apiBaseUrl}/login`,{email : "shakirahmed543213@gmail.com", password : "Shakir@123"});
        console.log(response.data);  
    }
    postDataToServer();

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
              <form className="login-form" noValidate autoComplete="off">
                <div className="input-group">
                  <label htmlFor="Email">Enter your Email</label>
                  <input
                    id="Email"
                    type="email"
                    className="login-text"
                    placeholder="Your email"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="Password">Enter your Password</label>
                  <input
                    id="Password"
                    type="password"
                    className="login-text"
                    placeholder="Your password"
                    required
                  />
                </div>
                <div className="forgot-pass">
                  <a href="#">Forgot Password?</a>
                </div>
                <div className="login-button">
                  <button type="submit" className="sign-in-btn">
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
      </div>
    </>
  );
};
