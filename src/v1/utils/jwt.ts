import * as JWT from "jsonwebtoken";
export class JWTTokenUtils {
   static sign(
      data: object,
      expiration: string = process.env.TOKEN_EXPIRATION_TIME || "24h",
      secret: string = process.env.JWT_SECRET || ""
   ): string {
      return JWT.sign(data, secret, {
         expiresIn: expiration,
      });
   }

   static verify(token: string) {
    try{
        return JWT.verify(token, process.env.JWT_SECRET || '') 
    }  catch(error){
        console.log(error, '<- Error verifying token..')
        throw error
    }
   }
}
