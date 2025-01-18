import { Response} from "express";
import * as httpCode from "./httpCode";
import * as Errors from './error';
import logger from "../logger";



export class HttpError extends Error{
    status: number;

    constructor(
        status: number, 
        message: string, 
        name: string

    ){
        super(message);
        this.status = status;
        this.name = name;
    }
}

export class ErrorHandler {
    static handle(error: Error, res: Response){
            logger.error(error);
            switch(error.name){
                case Errors.ValidationError:
                    return res.status(httpCode.BAD_REQUEST).json({
                        success: false,
                        message: error.message,
                    });
                    case Errors.UnauthenticatedError:
                        return res.status(httpCode.UNAUTHORIZED).json({
                            success: false,
                            message: "Unauthenticated",
                        });
                    case Errors.UnauthorizedError:
                        return res.status(httpCode.UNAUTHORIZED).json({
                                success: false,
                                message: "Unauthorized",
                            });
                    case Errors.BadRequestError:
                        return res.status(httpCode.BAD_REQUEST).json({
                                success: false,
                                message: error.message,
                            });
                    case Errors.NotFoundError:
                        return res.status(httpCode.NOT_FOUND).json({
                                success: false,
                                message: error.message,
                            });
                    default:
                        return res.status(httpCode.INTERNAL_SERVER_ERROR).json({
                                success: false,
                                message: "Internal Server Error",
                            });
            }
        }
}