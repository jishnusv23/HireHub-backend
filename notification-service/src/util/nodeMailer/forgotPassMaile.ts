import nodemailer from "nodemailer";
import { config } from "dotenv";
export const forgotPasswordMail = async (NotifyData: {
  email: string;
  url: string;
}): Promise<string> => {
  console.log("🚀 ~ file: forgotPassMaile.ts:7 ~ NotifyData:", NotifyData)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_PASSWORD,
      },
    });

    const message = `<p>Dear User,</p>

<p>You've requested to reset your password on HireHub. Please click the button below to reset your password. This link will expire after 15 minutes:</p>

<a href="${NotifyData.url}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Reset Password</a>

<p>If you didn't request this, you can ignore this email.</p>

<p>Best regards,<br/>EduVerse Team</p>`;

    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: NotifyData.email,
      subject: "Forgot Password @HireHub ",
      html: message,
    };
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${NotifyData.email}: ${info.messageId}`);
    
    return `Verification email sent to ${NotifyData.email}`;
  } catch (error: any) {
    console.error("Error occurred while sending newPassword", error);
    throw new Error(error?.message || "Failed to send verification email");
  }
};