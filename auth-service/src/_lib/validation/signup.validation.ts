import validator from "validator";

import { AuthenticationEntities,UserEntities } from "@/domain/entities";

const validateUser = async (user: AuthenticationEntities) => {
  if (user.username?.trim() === "" || user.email.trim() === "") {
    throw new Error("All Fields are Required");
  }

  if (!validator.isEmail(user.email)) {
    throw new Error("Invaild Email");
  }

  if (!validator.isStrongPassword(user.password)) {
    throw new Error("Password is not strong");
  }
  console.log(user.password, "check", user.confirmpassword);
  if (user.password !== user.confirmpassword) {
    throw new Error("password doesn't not match");
  }
  delete user.confirmpassword;
  return user as UserEntities
};
export default validateUser
