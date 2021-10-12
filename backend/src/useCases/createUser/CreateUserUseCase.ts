import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserRequest {
  email: string;
  password: string;
}

class CreateUserUseCase {
  async execute({ email, password }: IUserRequest) {
    // verify if user exists
    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    // submit new user
    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
