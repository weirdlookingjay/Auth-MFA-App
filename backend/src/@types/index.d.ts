import { UserDocument } from "../database/models/user.mode";
import { Request } from "express";
declare global {
  namespace Express {
    interface User extends UserDocument {}
    interface Request {
      sessionId?: string;
    }
  }
}
