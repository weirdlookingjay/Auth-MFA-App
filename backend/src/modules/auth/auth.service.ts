import { ErrorCode } from "../../common/enums/error-code-enum";
import { VerificationEnum } from "../../common/enums/verification-code.enum";
import { RegisterDto } from "../../common/interface/auth.interface";
import { BadRequestException } from "../../common/utils/catch-errors";
import { fortyFivesMinutesFromNow } from "../../common/utils/date-time";
import UserModel from "../../database/models/user.mode";
import VerificationCodeModel from "../../database/models/verification.mode";

export class AuthService {
  public async register(registerData: RegisterDto) {
    const { name, email, password } = registerData;

    const existingUser = await UserModel.exists({
      email,
    });
    if (existingUser) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    const userId = newUser._id;

    const verificationCode = await VerificationCodeModel.create({
      userId,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: fortyFivesMinutesFromNow(),
    });

    return {
      user: newUser,
    };
  }
}
