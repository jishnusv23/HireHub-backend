import validator from "validator";
import { UserEntities } from "../../domain/entities";
interface loginInter {
  username: string;
  password: string;
}

const loginValidator = async (loginRequest: loginInter) => {
  console.log(loginRequest, "here is the login request");
  if (!validator.isEmail(loginRequest.username)) {
    console.log("mail is problem ");
    throw new Error("Invalid Email");
  }
  if (!validator.isStrongPassword(loginRequest.password)) {
    throw new Error("Passsword is not strong");
  }
  return loginRequest as UserEntities;
};
export default loginValidator;
