import jwt, { JwtPayload } from "jsonwebtoken";
import {
   ForbiddenRequestError,
   InternalServerError,
} from "../../helpers/errors";

const JWT_SECRET = process.env.JWT_SECRET || "";
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || "24h";

export class JWTTokenUtils {
   static sign(
      data: object,
      expiration: string = TOKEN_EXPIRATION_TIME,
      secret: string = JWT_SECRET
   ): string {
      return jwt.sign(data, secret, {
         expiresIn: expiration,
      });
   }

   static verify(token: string) {
      try {
         return jwt.verify(token, JWT_SECRET);
      } catch (error) {
         throw new ForbiddenRequestError(
            "Token is invalid / User is not logged in."
         );
      }
   }

   static decode(token: string): JwtPayload {
      if (typeof token !== "string" || token.trim() === "") {
         throw new InternalServerError("Invalid or empty token.");
      }

      try {
         return jwt.decode(token) as JwtPayload;
      } catch (error) {
         throw new ForbiddenRequestError("Error decoding the token.");
      }
   }

   static formatToken(cookies: string | undefined): string {
      try {
         const formattedToken =
            cookies?.split("token=")[1]?.split(";")[0] || "";
         return formattedToken;
      } catch (error) {
         throw new InternalServerError("Error formatting token.");
      }
   }
}
