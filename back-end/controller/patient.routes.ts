/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           example: 1
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *         name:
 *           type: string
 *           description: Full name of the patient.
 *         sex:
 *           type: string
 *           description: Gender of the patient.
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Birth date of the patient.
 *         age:
 *           type: integer
 *           description: Age of the patient.
 *         address:
 *           type: string
 *           description: Home address of the patient.
 *         email:
 *           type: string
 *           format: email
 *           description: Contact email address of the patient.
 *         complaints:
 *           type: array
 *           description: List of complaints reported by the patient.
 *           items:
 *             type: string
 *         nationalRegister:
 *           type: string
 *           description: National register number of the patient.
 */


import express, {NextFunction, Request, Response} from 'express';
import patientService from '../service/patient.service';
import { Patient } from '../domain/model/patient';
import { PatientInput, Role } from '../types';

const patientRouter = express.Router();

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get a list of all patients.
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       '200':
 *         description: A list of patients.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

patientRouter.get("/", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const patients = await patientService.getPatients({username, role});
        res.status(200).json(patients);
    }
    catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /patients/{patientId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a patient by ID
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 */
patientRouter.get("/:patientId", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const patientId = req.params.patientId;
        const patient = await patientService.getPatientById({ username, role }, Number(patientId));
        res.status(200).json(patient);
    }
    catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /patients/add/{userId}:
 *   post:
 *     summary: Add a patient and link it to a user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The patient to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/patient'
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to link with
 *         schema:
 *           type: number
 *     responses:
 *       '201':
 *         description: The patient has been successfully added.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. Authentication failed.
 *       '403':
 *         description: Forbidden. Insufficient permissions.
 *       '500':
 *         description: Internal server error. Something went wrong on the server.
 */
patientRouter.post("/add/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { role: Role } };
        const { userId } = req.params;
        const { role } = request.auth;
        const patientData: PatientInput = req.body;  
        const result = await patientService.createPatient(role, patientData, userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});
/**
 * @swagger
 * /patients/delete/{patientId}:
 *   delete:
 *     summary: Delete a patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient to delete
 *     responses:
 *       '201':
 *         description: patient deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "patient deleted successfully"
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: patient not found
 *       '500':
 *         description: Internal Server Error
 *     security:
 *       - bearerAuth: []
 */
patientRouter.delete("/delete/:patientId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { role: Role } };
        const { role } = request.auth;
        const patientId = req.params.patientId;
        const result = await patientService.deletePatientById(role, Number(patientId));
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
})


export {patientRouter};
