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
 *               $ref: '#/components/schemas/office'
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

officeRouter.get("/:officeId", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const officeId = req.params.officeId;
        const office = await officeService.getofficeById(Number(officeId));
        res.status(200).json(office);
    }
    catch (error) {
        next(error);
    }
});

officeRouter.post("/add", async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const office = <OfficeInput>req.body;
        const result = await officeService.createoffice(office);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
})

export {officeRouter};