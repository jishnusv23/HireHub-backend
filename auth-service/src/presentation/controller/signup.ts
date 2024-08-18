import RabbitMQClient from "../../infrastructure/rabbitmq/client";
import { hashpassword } from "../../_lib/http/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
import validateUser from "../../_lib/validation/signup.validation";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";
import { generateOTP } from "../../_lib/utils/otp/genarateOtp";
import { confirmOtpNotification } from "../../infrastructure/services/sendMaile";
export const sigupController = (dependancies: IDependancies) => {
  const {
    useCases: { createUserUseCases, findUserByEmailUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Singup controller working", req.body);

      let afterValidUser = await validateUser(req.body);

      afterValidUser.password = await hashpassword(afterValidUser.password);
      const existingUser = await findUserByEmailUseCases(dependancies).execute(
        afterValidUser.email
      );

      // console.log(
      //   "🚀 ~ file: signup.ts:25 ~ return ~ existingUser:",
      //   existingUser
      // );
      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: "User already exists",
          data: null,
        });
      } else {
      //  const otp =await generateOTP()
        // console.log("🚀 ~ file: signup.ts:36 ~ return ~ otp:", otp)

        // const data={
        //   email:afterValidUser.email,
        //   otp:otp
        // }
        // const client=await RabbitMQClient.getInstance()
        // const result = await client.produce(data, "verifyOtp", "toNotif");
        // const otpNOtify=await confirmOtpNotification(afterValidUser.email)
        // console.log("🚀 ~ file: signup.ts:46 ~ return ~ otpNOtify:", otpNOtify)

        // console.log("🚀 ~ file: signup.ts:46 ~ return ~ result:", result)

        const created = await createUserUseCases(dependancies).execute(
          afterValidUser
        );
        console.log(created,'lpppppppppppppppppppppppppppppppp')
        if (!created) {
          res
            .status(500)
            .json({ success: false, message: "User creation failed" });
        } else {
          //*integrate the kafka here
          const userId = created?._id?.toString() as string;

          const accesstoken = generateAccessToken({
          
            _id: String(created?._id),
            email: created.email,
            role: created.role,
          });
          const refreshtoken = generateRefreshToken({
            _id: String(created?._id),
            email: created.email,
            role: created.role,
          });
          console.log(req.cookies,'kookokokokokoko')

          res.cookie("accesstoken", accesstoken, { httpOnly: true });
          res.cookie("refreshtoken", refreshtoken, { httpOnly: true });

          res
            .status(200)

            .json({
              success: true,
              message: "User created successfully",
              data: created,
            });
        }
      }

    } catch (error: any) {
      next(error);
    }
  };
};
