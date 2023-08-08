import { AuthLogic } from "../../logic";
import { Response } from "express"; // Import Response from express

describe("Clear token cookie", () => {
   const auth = new AuthLogic();

   it("Should clear the http-secureOnly jwt token stored in cookies", async () => {
      const mockResponse = {
         clearCookie: jest.fn(),
      } as unknown as Response;

      const response = await auth.logout(mockResponse);

      expect(response).toBe(mockResponse);
      expect(mockResponse.clearCookie).toHaveBeenCalledWith("token");
   });
});
