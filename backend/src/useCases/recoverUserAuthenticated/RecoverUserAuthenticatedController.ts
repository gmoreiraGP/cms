import { Request, Response } from "express";
import { RecoverUserAuthenticatedUseCase } from "./RecoverUserAuthenticatedUseCase";

class RecoverAuthenticatedUserController {
  async handle(request: Request, response: Response) {
    const { token } = request.body;

    const authenticateUserUseCase = new RecoverUserAuthenticatedUseCase();

    const tokenDecoded = await authenticateUserUseCase.execute(token);

    return response.json(tokenDecoded);
  }
}

export { RecoverAuthenticatedUserController };
