import express, {NextFunction, Request, Response} from 'express';
import officeService from '../service/office.service';
import { OfficeInput } from '../types';

const officeRouter = express.Router();

/**
 * @swagger
 * /offices:
 *   get:
 *     summary: Get a list of all offices.
 *     responses: 
 *       '200':
 *         description: A list of offices.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Office'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
officeRouter.get("/", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const offices = await officeService.getOffices();
        res.status(200).json(offices);
    }
    catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /offices/{officeId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a office by ID
 *     parameters:
 *       - in: path
 *         name: officeId
 *         required: true
 *         description: ID of the office to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 */
officeRouter.get("/:officeId", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const officeId = req.params.officeId;
        const office = await officeService.getOfficeById(Number(officeId));
        res.status(200).json(office);
    }
    catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /office/add:
 *   post:
 *     summary: Add a office to the list of offices
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The office to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/officeInput'
 *     responses:
 *       '201':
 *         description: The office has been successfully added.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. Authentication failed.
 *       '403':
 *         description: Forbidden. Insufficient permissions.
 *       '500':
 *         description: Internal server error. Something went wrong on the server.
 */
officeRouter.post("/add", async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const office = <OfficeInput>req.body;
        const result = await officeService.createOffice(office);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
})

export {officeRouter};