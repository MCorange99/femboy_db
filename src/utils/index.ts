import Id from "./id";
import permissions from "./permissions";
import { ApiError } from "./error";
import express from "express";
export default class Util {

    static randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async isUsernameAvailable(username: string, discrim: string) {
        return (await Server.db.userSchema.findOne({ username: username, discriminator: discrim}) === null);
    }

    static async isEmailAvailable(email: string) {
        return (await Server.db.userSchema.findOne({ email: email }) === null);
    }

    static newDiscrim(){
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        const getChar = () => chars[this.randomInt(0, chars.length - 1)];
        return getChar() + getChar() + getChar() + getChar();
    }

    static newSalt(){
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        const getChar = () => chars[this.randomInt(0, chars.length - 1)];
        return getChar() + getChar() + getChar() + getChar() + getChar() + getChar() + getChar() + getChar();
    }

    static newToken(){
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        const getChar = () => chars[this.randomInt(0, chars.length - 1)];
        let token = "T_";

        while (token.length < 32 + 2 ) { //* first 2 chars
            token += getChar();
        }

        return token;
    }

    static async checkApiAuth(req: express.Request, res: express.Response): Promise<boolean> {
        const AuthHead = req.headers["authorization"];
        if (!AuthHead) {
            res.status(400).json({
                code: "MissingHeader",
                status: 400,
                header: ["Authorization"],
                message: "The Authorization header is missing"
            });

            return false;
        }

        const reqUser = await Server.db.userSchema.findOne({
            api: {
                key: AuthHead
            }
        });

        if (!reqUser) {
            res.status(401).json({
                code: "Unauthorized",
                status: 401,
                message: "Invalid authorization token"
            });
            return false;
        }

        return true;
    }
}

export {
    permissions,
    Id,
    ApiError
};