import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { config } from "./config/app.config";
import connectDatabase from "./database/database";
import { errorHandler } from "./middlewares/errorHandler";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler";
import authRoutes from "./modules/auth/auth.routers";
import passport from "./middlewares/passport";
import { authenticateJWT } from "./common/strategies/jwt.strategy";
import sessionRoutes from "./modules/session/session.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Hello Subscribers!!!",
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(`${BASE_PATH}/session`, authenticateJWT, sessionRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
