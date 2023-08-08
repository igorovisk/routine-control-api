import jwt, { JwtPayload } from "jsonwebtoken";
import {
   ForbiddenRequestError,
   InternalServerError,
} from "../../helpers/errors";
export class JWTTokenUtils {
   static sign(
      data: object,
      expiration: string = process.env.TOKEN_EXPIRATION_TIME || "24h",
      secret: string = process.env.JWT_SECRET || ""
   ): string {
      return jwt.sign(data, secret, {
         expiresIn: expiration,
      });
   }

   static verify(token: string) {
      try {
         return jwt.verify(token, process.env.JWT_SECRET || "");
      } catch (error) {
         throw new ForbiddenRequestError(
            `Token is invalid / User is not logged in.`
         );
      }
   }

   static decode(token: string): jwt.JwtPayload {
      try {
         if (typeof token !== "string" || token === null) {
            throw new InternalServerError("Token is not a string");
         }
         return jwt.decode(token) as JwtPayload;
      } catch (error) {
         console.log(error, "error decoding token log");
         throw new Error("Error decoding the token");
      }
   }

   static formatToken(cookies: string | undefined): string {
      try {
         let formattedToken = cookies?.split("token=")[1];
         formattedToken = formattedToken?.split(";")[0];
         return formattedToken || "";
      } catch (error) {
         throw error;
      }
   }
}
