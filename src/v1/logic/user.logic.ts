import { Request, Response } from "express";
import { UserDTO } from "../interfaces/dtos";
import { UserRepository } from "../repositories";
import { Crypto } from "../utils";
export class UserLogic {
   private repository: UserRepository;
   private crypto: Crypto;

   constructor() {
      this.repository = new UserRepository();
      this.crypto = new Crypto();
   }

   async getUsers(req: Request, res: Response): Promise<UserDTO[]> {
      try {
         const response = await this.repository.getUsers();
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getUserByEmail(
      req: Request,
      res: Response
   ): Promise<UserDTO | null> {
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
         const { email, username, password, birthDate, age, fullname } =
            req.body;

         const userExists = await this.repository.getUserByEmail(
            email
         );
         if (userExists) {
            throw new Error("This user already exists");
         } else {
            const newUser = {
               email: email,
               username: username,
               fullname: fullname,
               age: age,
               birthDate: new Date(birthDate),
               password: await this.crypto.encryptString(password),
            };

            const response = this.repository.createUser(newUser);
            return response;
         }
      } catch (error) {
         throw error;
      }
   }
   async updateUser(req: Request, res: Response): Promise<UserDTO> {
      try {
         const { email, username, password, birthDate, fullname } = req.body;

         const updatedUser = {
            email: email,
            username: username,
            fullname: fullname,
            birthDate: new Date(birthDate),
            password: password,
         };

         const response = this.repository.updateUser(updatedUser);
         return response;
      } catch (error) {
         throw error;
      }
   }
   //    async getUserById() {}
}
