/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role:
 *           type: Role
 *           description: The role of the user.
 */
import express, {NextFunction, Request, Response} from 'express';
import userService from '../service/user.service';
import { Role, UserInput } from '../types/index';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         format: int64
 *                       username:
 *                         type: string
 *                       role:
 *                         type: string
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 *     security:
 *       - bearerAuth: []
 */
userRouter.get("/", async (req: Request , res:Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const users = await userService.getAllUsers({username, role});
        res.status(200).json(users);
    }
    catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User Signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: Role
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User created successfully"
 *       '400':
 *         description: Bad Request - Invalid input data
 *       '500':
 *         description: Internal Server Error
 */
userRouter.post("/signup", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const createdUser = await userService.createUser(userInput);
        res.status(200).json(createdUser);
    }
    catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal Server Error
 */
userRouter.post("/login", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({message: "Authentication succesfull", ...response});
    }
    catch (error) {
        next(error);
    }
});

export { userRouter };
