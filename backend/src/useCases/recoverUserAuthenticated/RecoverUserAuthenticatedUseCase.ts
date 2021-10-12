import { client } from "../../prisma/client";
import { DecodeTokenProvider } from "../../provider/DecodeTokenProvider";

class RecoverUserAuthenticatedUseCase {
  async execute(token: string) {
    const decodeTokenProvider = new DecodeTokenProvider();
    const tokenDecoded = await decodeTokenProvider.execute(token);

    const user_id = tokenDecoded.payload.sub;
    const user = await client.user.findFirst({
      where: {
        id: user_id,
      },
    });

    return user;
  }
}

export { RecoverUserAuthenticatedUseCase };
