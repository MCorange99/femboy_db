import express from "express";

class ApiError {
    static MissingProps(res: express.Response, props: string[]) {
        return res.status(400).json({
            code: "MissingProps",
            status: 400,
            props: props,
            message: "Missing necessary fields"
        });
    }

    static UsernameTaken(res: express.Response) {
        return res.status(409).json({
            code: "UsernameTaken",
            status: 409,
            message: "Unable to find a discriminator with that username"
        });
    }

    static InvalidEmail(res: express.Response) {
        return res.status(400).json({
            code: "InvalidEmail",
            status: 400,
            message: "Email address is not valid"
        });
    }

    static EmailTaken(res: express.Response) {
        return res.status(409).json({
            code: "EmailTaken",
            status: 409,
            message: "Email address is already taken"
        });
    }

    static CredsInvalid(res: express.Response) {
        return res.status(401).json({
            code: "CredsInvalid",
            status: 401,
            message: "Password or Email is invalid"
        });
    }

    static UserNotFound(res: express.Response) {
        return res.status(404).json({
            code: "UserNotFound",
            status: 404,
            message: "A user with that email was not found"
        });
    }

    static InternalError(res: express.Response, msg: string) {
        return res.status(500).json({
            code: "InternalServerError",
            status: 500,
            message: msg
        });
    }


}


export {
    ApiError
};