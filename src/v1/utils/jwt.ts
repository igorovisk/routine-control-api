import jwt from "jsonwebtoken";
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

   static decode(token: string): string | jwt.JwtPayload | null{
      try {
         if (typeof token !== 'string') {
            throw new Error('Token is not a string');
          }
         return jwt.decode(token);
      } catch (error) {
         console.log(error, "error decoding token log");
         throw new Error("Error decoding the token");
      }
   }
}
