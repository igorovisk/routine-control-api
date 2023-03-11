import { Request, Response } from "express";
import { UserRepository } from "../repositories";
import { JWTTokenUtils } from "../utils";
import { Crypto } from "../utils";

export class AuthLogic {
   private static jwt: JWTTokenUtils;
   private userRepository: UserRepository;
   private crypto: Crypto;
   constructor() {
      this.crypto = new Crypto();
      this.userRepository = new UserRepository();
   }

   async login(email: string, password: string) {
      try {
         const user = await this.userRepository.getUserByEmail(email);
         if (!user) {
            throw new Error("User not found..");
         }
         console.log(user.password, " user.password");
         console.log(password, "password");

         const comparedPasswords = await this.crypto.compare(
            password,
            user.password
         );

         if(!comparedPasswords){
            throw new Error('Wrong username or password')
         }

         //TODO sign jwt and return token

      } catch (error) {
         console.log(error, "<- Error on login logic..");
      }
   }
}
