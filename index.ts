import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use((req: Request, res: Response, next: NextFunction) => { // Handle error CORS policy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import authRoute from "./src/routes/auth.route";

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});
app.use('/auth', authRoute);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});