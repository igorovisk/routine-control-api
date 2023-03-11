import * as JWT from 'jsonwebtoken'

export  class  JWTTokenUtils {
    static sign (data: object, expiration: number, secret:string = process.env.JWT_SECRET || ''): string{
        return JWT.sign(data, secret, {
            expiresIn: expiration
        })
    }
}