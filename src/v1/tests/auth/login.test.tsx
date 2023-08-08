import { AuthLogic } from "../../logic";
import { AuthRouter as router } from "../../routes";

describe("Generate JWT Token - Correct Credentials ", () => {
   const auth = new AuthLogic();

   it("Should define a string as a jwt token if correct credentials are provided", async () => {
      //correct credentials
      const credentials = {
         email: "igorovisk@gmail.com",
         password: "teste123",
      };

      const token = await auth.login(credentials.email, credentials.password);

      expect(typeof token).toBe("string");
   });
});

describe("Login - Incorrect Credentials", () => {
   const auth = new AuthLogic();

   it("Existing the user, should throw an error message that the username or password is incorrect ", async () => {
      const credentials = {
         email: "igorovisk@gmail.com",
         password: "wrongPassword",
      };

      try {
         const response = await auth.login(
            credentials.email,
            credentials.password
         );
         expect(response).toBeFalsy();
      } catch (error: any) {
         expect(error.message).toBe("Wrong username or password");
      }
   });
});

describe("Login - No user found", () => {
   const auth = new AuthLogic();

   it("Should throw an error message that the user is not found ", async () => {
      const credentials = {
         email: "nullUser@gmail.com",
         password: "teste123",
      };

      try {
         const response = await auth.login(
            credentials.email,
            credentials.password
         );
         expect(response).toBeFalsy();
      } catch (error: any) {
         expect(error.message).toBe("User not found..");
      }
   });
});
