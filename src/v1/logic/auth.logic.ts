import { Request, Response } from "express";
import { UserRepository } from "../repositories";
import { JWTTokenUtils } from "../utils";
import { Crypto } from "../utils";
import { BadRequestError } from "../../helpers/errors";

export class AuthLogic {
   private static jwt: JWTTokenUtils;
   private userRepository: UserRepository;
   private crypto: Crypto;

   constructor() {
      this.crypto = new Crypto();
      this.userRepository = new UserRepository();
   }

   async login(email: string, password: string): Promise<string> {
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
         throw new BadRequestError("User not found..");
      }

      const comparedPasswords = await this.crypto.compare(
         password,
         user.password
      );

      if (!comparedPasswords) {
         throw new BadRequestError("Wrong username/password");
      }

      const token = JWTTokenUtils.sign({
         user: { ...user },
         auth: true,
      });

      return token;
   }

   async logout(res: Response): Promise<Response> {
      res.clearCookie("token"); // Clear the "token" cookie
      return res;
   }

   async resetPassword(req: Request, res: Response): Promise<Response> {
      res.clearCookie("token");
      const email = req.body;
      const user = await this.userRepository.resetPassword(email);

      const resetPasswordToken = "implement token";

      //TODO Implement email sender and token generation

      return res.status(200).send({ message: "Password token sent by email!" });
   }
}
