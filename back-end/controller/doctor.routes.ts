import express, {NextFunction, Request, Response} from 'express';
import doctorService from '../service/doctor.service'
import { Doctor } from '../domain/model/doctor';
import { Role } from '../types';

const doctorRouter = express.Router();

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get a list of all doctors.
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       '200':
 *         description: A list of doctors.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
doctorRouter.get("/", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const doctors = await doctorService.getDoctors({username, role});
        res.status(200).json(doctors);
    }
    catch (error) {
        next(error);
    }
});

doctorRouter.get("/:doctorId", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const doctorId = req.params.doctorId;
        const doctor = await doctorService.getDoctorById({ username, role }, Number(doctorId));
        res.status(200).json(doctor);
    }
    catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /doctors/add:
 *   post:
 *     summary: Add a doctor to the list of doctors
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The doctor to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/doctor'
 *     responses:
 *       '201':
 *         description: The doctor has been successfully added.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. Authentication failed.
 *       '403':
 *         description: Forbidden. Insufficient permissions.
 *       '500':
 *         description: Internal server error. Something went wrong on the server.
 */
doctorRouter.post("/add", async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const request = req as Request & { auth: { role: Role } };
        const { role } = request.auth;
        const doctor = <Doctor>req.body;
        const result = await doctorService.createDoctor(role, doctor);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /doctors/delete/{doctorId}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the doctor to delete
 *     responses:
 *       '201':
 *         description: doctor deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "doctor deleted successfully"
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: doctor not found
 *       '500':
 *         description: Internal Server Error
 *     security:
 *       - bearerAuth: []
 */
doctorRouter.delete("/delete/:doctorId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { role: Role } };
        const { role } = request.auth;
        const doctorId = req.params.doctorId;
        const result = await doctorService.deleteDoctorById(role, Number(doctorId));
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
})

// doctorRouter.put("/update", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const doctor= <doctorInput>req.body;
//         const result = await doctorService.updatedoctor(doctor);
//         res.status(201).json(result);
//     }
//     catch (error) {
//         next(error);
//     }
// })

export {doctorRouter};
