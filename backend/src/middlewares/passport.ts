import passport from "passport";
import { setupJwtStrategy } from "../common/strategies/jwt.strategy";

const initializePassport = () => {
  setupJwtStrategy(passport);
};

initializePassport();
export default passport;
