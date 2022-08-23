import { Response } from "express";

function sendResponse(res: Response, code: number, message: string, data: any) {
    return res.status(code).json({
        error: code == 201 || code == 200 ? false : true,
        status: code,
        message: message,
        data: data
    });
};

export {
    sendResponse,
};