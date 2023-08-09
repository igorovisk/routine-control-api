import bcrypt from "bcrypt";

export class Crypto {
   private saltRounds: number;
   constructor() {
      this.saltRounds = 10;
   }
   async encryptString(targetString: string): Promise<string> {
      return new Promise((resolve, reject) => {
         bcrypt.hash(
            targetString,
            this.saltRounds,
            function (error: Error | undefined, encryptedPromise: string) {
               return resolve(encryptedPromise);
            }
         );
      });
   }

   async compare(string: string, stringToCompare: string): Promise<boolean> {
      return bcrypt.compare(string, stringToCompare);
   }
}
