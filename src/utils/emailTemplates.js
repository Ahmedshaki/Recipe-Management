const otpTemplate = ({name, otp}) => `
<div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h2 style="color: #ff6b6b;">Hello ${name || 'User'},</h2>
    <p style="font-size: 16px; color: #333;">
      You recently requested to reset your password. Use the OTP below:
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; color: #4caf50; background: #e6f4ea; padding: 10px 20px; border-radius: 5px;">
        ${otp}
      </span>
    </div>
    <p style="font-size: 14px; color: #999;">Valid for 10 minutes.</p>
    <p style="font-size: 14px; color: #999;">If you didn’t request this, ignore it.</p>
    <hr style="margin: 30px 0;">
    <p style="font-size: 12px; text-align: center; color: #ccc;">
      &copy; ${new Date().getFullYear()} Recipe Management App. All rights reserved.
    </p>
  </div>
</div>
`;


const otpVerifiedTemplate = ({ name }) => {
    return `
      <div style="font-family: 'Segoe UI', sans-serif; background: #f4f6f8; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); padding: 30px;">
          <h2 style="text-align: center; color: #28a745;">✅ OTP Verified Successfully</h2>
          <p style="font-size: 16px; color: #333;">Hello <strong>${name}</strong>,</p>
          <p style="font-size: 15px; color: #444;">
            Your OTP has been successfully verified. You can now reset your password securely.
          </p>
  
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: #28a745; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-size: 16px;">Reset Your Password</a>
          </div>
  
          <p style="font-size: 14px; color: #888;">
            If you didn’t request this, please contact our support team immediately.
          </p>
  
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
  
          <p style="font-size: 12px; color: #aaa; text-align: center;">
            &copy; 2025 Recipe Management App. All rights reserved.
          </p>
        </div>
      </div>
    `;
  };
  
module.exports = {
    otpTemplate,
    otpVerifiedTemplate
};