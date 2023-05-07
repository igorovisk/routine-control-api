import jwt, { JwtPayload } from "jsonwebtoken";
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
         throw new Error(`Token is invalid / User is not logged in.`);
      }
   }

   static decode(token: string): jwt.JwtPayload {
      try {
         if (typeof token !== "string" || token === null) {
            throw new Error("Token is not a string");
         }
         return jwt.decode(token) as JwtPayload;
      } catch (error) {
         console.log(error, "error decoding token log");
         throw new Error("Error decoding the token");
      }
   }

   static formatToken(cookies: string | undefined): string {
      try {
         const formattedToken = cookies?.split("token=")[1];
         return formattedToken || "";
      } catch (error) {
         console.log(error, "error formatting token log");
         return "";
      }
   }
}
