import { Request, Response } from "express";
import util from "util";
import { dbSQL } from "../models/database";
import { sendResponse } from "../utils/response.util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

function login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendResponse(res, 400, "Please fill all data", null);
    };

    const query = util.promisify(dbSQL.query).bind(dbSQL);
    (async () => {
        try {
            const isEmailAvailable: any = await query(`SELECT * FROM admin where email = "${email}"`);
            if (isEmailAvailable.length <= 0) return sendResponse(res, 500, "Email is not registered", null);
            const userCredential = isEmailAvailable[0];
            const isPasswordMatch = bcrypt.compareSync(password, userCredential.password);
            if (!isPasswordMatch) return sendResponse(res, 500, "Wrong password", null);
            const token = jwt.sign(
                {
                    id: userCredential.id,
                    role: userCredential.role,
                    username: userCredential.email
                },
                `${process.env.JWT_SECRET}`
            );
            return sendResponse(res, 200, "Log in successful", {token});
        } catch(error) {
            console.log(error);
            return sendResponse(res, 500, "Server error", null);
        };
    })();
};

export {
    login,
};