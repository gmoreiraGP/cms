import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    // verify if user exists
    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("User or Password incorrect");
    }

    // verify if password is correct
    const passwordMatch = compare(password, userAlreadyExists.password);
    if (!passwordMatch) {
      throw new Error("User or Password incorrect");
    }

    // generate user token
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    // delete all old refreshToken
    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id,
      },
    });

    // generate user refresh token
    const generateRefreshToken = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );
    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
