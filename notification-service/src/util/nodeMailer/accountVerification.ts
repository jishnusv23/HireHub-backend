import nodemailer from "nodemailer";
import { config } from "dotenv";

export const SendVerificationMail = async (
  recipientEmail: string,
  OTP: string
): Promise<string> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_PASSWORD,
      },
    });

    const message = `
            Dear User,<br><br>
            Thank you for choosing HireHub. To continue with your account setup, please enter the following one-time password (OTP):<br><br>
            Your OTP: <b>${OTP}</b><br><br>
            Please use this OTP within 1 minute(s) to complete your verification process.<br><br>
            If you didn't request this OTP, please ignore this message.<br><br>
            Best regards,<br>
            The HireHub Team
        `;

    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: recipientEmail,
      subject: "HireHub Account Verification",
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipientEmail}: ${info.messageId}`);

    return `Verification email sent to ${recipientEmail}`;
  } catch (error: any) {
    console.error("Error occurred while sending OTP", error);
    throw new Error(error?.message || "Failed to send verification email");
  }
};
