import { decode } from "jsonwebtoken";

class DecodeTokenProvider {
  async execute(token: string) {
    const tokenDecoded = decode(token, {
      complete: true,
    });

    return tokenDecoded;
  }
}

export { DecodeTokenProvider };
