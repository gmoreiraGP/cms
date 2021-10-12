import { Request, Response } from "express";
import { ReadUserUseCase } from "./ReadUserUseCase";

class ReadUserController {
  async handle(request: Request, response: Response) {
    const readUserUseCase = new ReadUserUseCase();

    const users = await readUserUseCase.execute();

    response.json(users);
  }
}

export { ReadUserController };
