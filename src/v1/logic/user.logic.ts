import { Request, Response } from "express";
import * as fs from "fs";
import { UserDTO } from "../interfaces/dtos";
import { UserRepository } from "../repositories";
import { Crypto, JWTTokenUtils } from "../utils";
import { validateProfileImage } from "../utils/profileImage";
import { EmailUtils } from "../utils/emailChecker";
import { Middleware } from "../middlewares";
export class UserLogic {
   private repository: UserRepository;
   private crypto: Crypto;
   private middleware: Middleware;
   constructor() {
      this.repository = new UserRepository();
      this.crypto = new Crypto();
      this.middleware = new Middleware();
   }

   async getMe(req: Request, res: Response): Promise<UserDTO[] | {}> {
      try {
         const formattedToken = JWTTokenUtils.formatToken(req.headers.cookie);
         const token = JWTTokenUtils.decode(formattedToken);
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
         const { userId } = req.params;
         const response = await this.repository.getUserById(userId);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async createUser(req: Request, res: Response): Promise<UserDTO> {
      try {
         const {
            email,
            username,
            password,
            birthdate,
            fullname,
            profileImage,
         } = req.body;

         const emailUtils = new EmailUtils();
         const userExists = await emailUtils.getUserByEmail(email);

         if (userExists) {
            throw new Error("This user already exists");
         } else {
            //Calculate user age
            const today = new Date();
            const convertedBirthDate = new Date(birthdate);
            const diffInMs = today.getTime() - convertedBirthDate.getTime();
            //
            //profileImage check
            let profileImageBuffer: Buffer | null = null;
            if (profileImage) {
               const validatedProfileImage = validateProfileImage(profileImage);
               const profileImageContents = await fs.promises.readFile(
                  profileImage.path
               );
               profileImageBuffer = Buffer.from(profileImageContents);
            }

            const newUser = {
               email: email,
               username: username,
               fullname: fullname,
               birthDate: convertedBirthDate,
               password: await this.crypto.encryptString(password),
               profileImage: profileImageBuffer || null,
               role: "user",
            };
            const response = await this.repository.createUser(newUser);
            return response;
         }
      } catch (error) {
         console.log(error, "ERRO CAPTURADO");
         throw error;
      }
   }
   async updateUser(req: Request, res: Response): Promise<UserDTO | undefined> {
      try {
         const {
            email,
            username,
            password,
            birthDate,
            fullname,
            profileImage,
         } = req.body;

         await this.middleware.isUserLoggedOrAdmin(req);

         const updatedUser = {
            id: req.params.userId,
            email: email,
            username: username,
            fullname: fullname,
            birthDate: new Date(birthDate),
            password: await this.crypto.encryptString(password),
            profileImage: profileImage,
         };
         const response = await this.repository.updateUser(updatedUser);
         return response;
      } catch (error) {
         console.log(error, "ERROR CAPTURED!");
         throw error;
      }
   }
}
