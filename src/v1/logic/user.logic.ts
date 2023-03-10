import { Request, Response } from "express";
import { UserDTO } from "../interfaces/dtos";
import { UserRepository } from "../repositories";

export class UserLogic {
   private repository: UserRepository;

   constructor() {
      this.repository = new UserRepository();
   }

   async getUsers(req: Request, res: Response): Promise<UserDTO[]> {
      try {
         const response = await this.repository.getUsers();
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getUserByUsernameOrEmail(
      req: Request,
      res: Response
   ): Promise<UserDTO | null> {
      try {
         const response = await this.repository.getUserByUsernameOrEmail();
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

         const newUser = {
            email: email,
            username: username,
            fullname: fullname,
            age: age,
            birthDate: new Date(birthDate),
            password: password,
            routineId: "123",
         };

         const userExists = await this.repository.getUserByUsernameOrEmail(
            username,
            email
         );
         console.log(userExists, "userExists");
         if (userExists) {
            throw new Error("This user already exists");
         } else {
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
