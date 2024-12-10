/**
 * @swagger
 *   components:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            firstName:
 *              type: string
 *              description: First name.
 *            lastName:
 *              type: string
 *              description: Last name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      UserInput:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            firstName:
 *              type: string
 *              description: First name.
 *            lastName:
 *              type: string
 *              description: Last name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      Role:
 *          type: string
 *          enum: [student, lecturer, admin, guest]
 */
import express, {NextFunction, Request, Response} from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';

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
userRouter.get("/", async (req: Request & { auth: any }, res:Response, next: NextFunction) => {
    try {
        const { username, role } = req.auth;
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
