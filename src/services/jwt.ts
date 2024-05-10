import { User } from "@prisma/client";
import { prismaClient } from "../clients/db";
import JWT from "jsonwebtoken";
import { JWTUser } from "../app/interfaces";
const JWT_SECRET ="$33fen124.";

class JWTService{
    public static async   generateTokenForUser(user:User){
        const payload :JWTUser = {
            id:user?.id,
            email:user?.email,
        };
        const token = JWT.sign(payload,JWT_SECRET);
        return token;


    }
    public static decodeToken(token:string){
        try {
            return JWT.verify(token,JWT_SECRET) as JWTUser
        } catch (error) {
            return null
        }
        
    }
}
export default JWTService;