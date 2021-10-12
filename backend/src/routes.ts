import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";
import { ReadUserController } from "./useCases/readUser/ReadUserController";
import { RecoverAuthenticatedUserController } from "./useCases/recoverUserAuthenticated/RecoverUserAuthenticatedController";

const router = Router();
const createUserController = new CreateUserController();
const readUserController = new ReadUserController();
const authenticateUserController = new AuthenticateUserController();
const recoverAuthenticatedUserController =
  new RecoverAuthenticatedUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, readUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/recover-me", recoverAuthenticatedUserController.handle);
router.post("/refresh-token", refreshTokenUserController.handle);

router.get("/courses", ensureAuthenticated, (req, res) => {
  return res.json([
    { id: 1, name: "NodeJS" },
    { id: 2, name: "ReactJS" },
    { id: 3, name: "NextJS" },
    { id: 4, name: "PrismaJS" },
  ]);
});

export { router };
