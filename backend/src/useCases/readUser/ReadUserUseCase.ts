import { client } from "../../prisma/client";

class ReadUserUseCase {
  async execute() {
    const user = await client.user.findMany();

    return user;
  }
}

export { ReadUserUseCase };
