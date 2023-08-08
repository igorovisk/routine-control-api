import { UserLogic } from "../../logic";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RoutineDTO, UserDTO } from "../../interfaces/dtos";
describe("Get Current User", () => {
   const userLogic = new UserLogic();
   const mockResponse = {} as Response;
   const prisma = new PrismaClient();

   it("Should retrieve the current user's data", async () => {
      const mockRequest = {
         headers: {
            cookie:
               "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOTdjYTBmM2QtZDFhYy00Mzg0LThiODQtNDI0M2ZmYTg0Mjk0IiwiZW1haWwiOiJpZ29yb3Zpc2tAZ21haWwuY29tIiwidXNlcm5hbWUiOiJpZ29yb3Zpc2siLCJmdWxsbmFtZSI6Imlnb3IgYm9yZ2lvIiwicm9sZSI6InVzZXIiLCJiaXJ0aERhdGUiOiIxOTk4LTExLTMwVDAyOjAwOjAwLjAwMFoiLCJwYXNzd29yZCI6IiQyYiQxMCRMaWthakN5WEtjVExTak5mOGVsYU5lZ2FKeDhjdE5MdmdpYzJ4b2IvUFBnbkVLdWtZM0VSVyIsImNyZWF0ZWRBdCI6IjIwMjMtMDctMjlUMTk6MjE6NDAuMDMxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMjlUMTk6MjE6NDAuMDMxWiIsInByb2ZpbGVJbWFnZSI6bnVsbCwiUm91dGluZSI6W3siaWQiOiIxMmNjZmI1MS1iMDlkLTQ0YTEtODkyYS1iNzAwMTNmYTRmMTYiLCJuYW1lIjoiQXp1bCIsImRlc2NyaXB0aW9uIjoiIiwidGFza3MiOlt7ImlkIjoiZmFhMjA2NzEtOTI3ZC00YTI2LTk0NDMtOTk4MjVmMzAwY2FjIiwicm91dGluZUlkIjoiMTJjY2ZiNTEtYjA5ZC00NGExLTg5MmEtYjcwMDEzZmE0ZjE2IiwibmFtZSI6IkF0aXZpZGFkZSAxIiwiZGVzY3JpcHRpb24iOiIxaCIsImNvbW1lbnQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjMtMDgtMDJUMDI6MDI6MzIuMjQ0WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDgtMDJUMDI6MDI6MzIuMjQ0WiJ9LHsiaWQiOiI1OTQ5ZjFhZi04Y2VkLTQ1OWUtODM2Ni02NTI0ZjdiZDU0ZDEiLCJyb3V0aW5lSWQiOiIxMmNjZmI1MS1iMDlkLTQ0YTEtODkyYS1iNzAwMTNmYTRmMTYiLCJuYW1lIjoiQXRpdmlkYWRlIDIiLCJkZXNjcmlwdGlvbiI6IjIgaG9yYXMiLCJjb21tZW50IjpudWxsLCJjcmVhdGVkQXQiOiIyMDIzLTA4LTAyVDE3OjE3OjMzLjI4MloiLCJ1cGRhdGVkQXQiOiIyMDIzLTA4LTAyVDE3OjE3OjMzLjI4MloifSx7ImlkIjoiZTFiODVlOWItOWQyZC00OWIwLWFjYTItYTNjZTFhOTQzYTZhIiwicm91dGluZUlkIjoiMTJjY2ZiNTEtYjA5ZC00NGExLTg5MmEtYjcwMDEzZmE0ZjE2IiwibmFtZSI6IkFsb25nYXIiLCJkZXNjcmlwdGlvbiI6IjNoIiwiY29tbWVudCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMy0wOC0wMlQxNzoxNzo0NC4yMjlaIiwidXBkYXRlZEF0IjoiMjAyMy0wOC0wMlQxNzoxNzo0NC4yMjlaIn1dfV19LCJhdXRoIjp0cnVlLCJpYXQiOjE2OTE1MTY2NjgsImV4cCI6MTY5MTYwMzA2OH0.T0yNZIb5h_pRpswj8x_O4f-QpLCz8-Y0ibOPrU8yamw",
         },
      } as Request;

      const result = await userLogic.getMe(mockRequest, mockResponse);

      interface meObject {
         id: string;
         fullname: string;
         email: string;
         username: string;
         birthDate: Date;
         routines: RoutineDTO[] | null;
         profileImage: null;
         role: string;
      }

      expect(result).toMatchObject<meObject>({
         id: expect.any(String),
         fullname: expect.any(String),
         email: expect.any(String),
         username: expect.any(String),
         birthDate: expect.any(Date),
         routines: expect.arrayContaining([expect.anything()]),
         profileImage: null,
         role: expect.any(String),
      });
   });
});
