import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserDTO } from "../interfaces/dtos";
import { UserRepository } from "../repositories";
import { Crypto, JWTTokenUtils } from "../utils";
export class UserLogic {
   private repository: UserRepository;
   private crypto: Crypto;

   constructor() {
      this.repository = new UserRepository();
      this.crypto = new Crypto();
   }

   async getMe(req: Request, res: Response): Promise<UserDTO[] | {}> {
      try {
         if (typeof req.headers.cookie !== "string") {
            throw new Error("Token is not a string");
         }
         const formattedToken = req.headers.cookie?.split("token=")[1];
         const token = JWTTokenUtils.decode(formattedToken);
         if (token === null || typeof token !== "object") {
            throw new Error("Invalid token on request");
         }
         const response = await this.repository.getMe(token.user.id);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getUsers(req: Request, res: Response): Promise<UserDTO[]> {
      try {
         const response = await this.repository.getUsers();
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getUserByEmail(req: Request, res: Response): Promise<UserDTO | null> {
      try {
         const response = await this.repository.getUserByEmail(req.body.email);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getUserById(req: Request, res: Response): Promise<UserDTO | {}> {
      try {
         const { id } = req.params;
         const response = await this.repository.getUserById(id);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async createUser(req: Request, res: Response): Promise<UserDTO> {
      try {
         const { email, username, password, birthdate, fullname } = req.body;

         const userExists = await this.repository.getUserByEmail(email);
         if (userExists) {
            throw new Error("This user already exists");
         } else {
            //Calculate user age
            const today = new Date();
            const convertedBirthDate = new Date(birthdate);
            const diffInMs = today.getTime() - convertedBirthDate.getTime();
            const age = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
            //

            const newUser = {
               email: email,
               username: username,
               fullname: fullname,
               birthDate: convertedBirthDate,
               password: await this.crypto.encryptString(password),
            };

            const response = await this.repository.createUser(newUser);
            return response;
         }
      } catch (error) {
         throw error;
      }
   }
   async updateUser(req: Request, res: Response): Promise<UserDTO> {
      try {
         const { email, username, password, birthDate, fullname } = req.body;
         if (typeof req.headers["x-access-token"] !== "string") {
            throw new Error("Token is not a string");
         }
         const token = JWTTokenUtils.decode(req.headers["x-access-token"]);
         if (typeof token === "object" && token !== null) {
            const updatedUser = {
               id: token.user.id,
               email: email,
               username: username,
               fullname: fullname,
               birthDate: new Date(birthDate),
               password: password,
            };
            const response = await this.repository.updateUser(updatedUser);
            return response;
         }
         throw new Error("Error on decoded token");
      } catch (error) {
         throw error;
      }
   }
}
