
import jwt from "jsonwebtoken";

export const VerifyJwtToken = (token: string) => {
  return jwt.verify(token, String(process.env.REFRESH_TOKEN_SECRET));
};
