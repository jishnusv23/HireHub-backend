import jwt from "jsonwebtoken";

export const generateForgotPasswords = (payload: { email: string }): string => {
  const secret = process.env.FORGOT_TOKEN_SECRET;
  if (!secret) {
    throw new Error("token is not getting in env");
  }
  try {
    return jwt.sign(payload, secret, { expiresIn: "15m" });
  } catch (error: any) {
    console.error("Something wrong in generate forgot password", error);
    throw new Error('Failed token generating');
  }
};
