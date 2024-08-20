import jwt,{JwtPayload} from "jsonwebtoken";
interface ForgotPasswordPayload extends JwtPayload {
  email: string;
}
export const verifyforgotPassword = (token: string) => {
  const secret = process.env.FORGOT_TOKEN_SECRET;

  if (!secret) {
    throw new Error("FORGOT_TOKEN_SECRET is invalid check then env file");
  }
  try {
    const decode= jwt.verify(token, secret) as ForgotPasswordPayload;
    return decode
  } catch (error: any) {
    throw new Error("Ivalid or Exipired token");
  }
};
