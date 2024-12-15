
import express, {NextFunction, Request, Response} from 'express';
import consultationService from '../service/consultation.service';
import { ConsultationInput, Role } from '../types';

const consultationRouter = express.Router();

/**
 * @swagger
 * /consultations:
 *   get:
 *     summary: Get a list of all consultations.
 *     security:
 *       - bearerAuth: []
 *     responses: 
 *       '200':
 *         description: A list of consultations.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultation'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
consultationRouter.get("/", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const consultations = await consultationService.getConsultations({username, role});
        res.status(200).json(consultations);
    }
    catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /consultations/{consultationId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a consultation by ID
 *     parameters:
 *       - in: path
 *         name: consultationId
 *         required: true
 *         description: ID of the consultation to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 */
consultationRouter.get("/:consultationId", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const consultationId = req.params.consultationId;
        const consultation = await consultationService.getConsultationById(Number(consultationId));
        res.status(200).json(consultation);
    }
    catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /consultations/add:
 *   post:
 *     summary: Add a consultation to the list of consultations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The consultation to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/consultationInput'
 *     responses:
 *       '201':
 *         description: The consultation has been successfully added.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. Authentication failed.
 *       '403':
 *         description: Forbidden. Insufficient permissions.
 *       '500':
 *         description: Internal server error. Something went wrong on the server.
 */
consultationRouter.post("/add", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { startDate, endDate, name, patient, doctors } = req.body;

        const consultationInput: ConsultationInput = {
            startDate: new Date(startDate), 
            endDate: new Date(endDate),   
            name,
            patientId: patient.id,
            doctorIds: doctors.map((doctor: { id: number }) => doctor.id) 
        };

        const result = await consultationService.createConsultation(consultationInput);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /consultations/delete/{consultationId}:
 *   delete:
 *     summary: Delete a consultation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the consultation to delete
 *     responses:
 *       '201':
 *         description: consultation deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "consultation deleted successfully"
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: consultation not found
 *       '500':
 *         description: Internal Server Error
 *     security:
 *       - bearerAuth: []
 */
consultationRouter.delete("/delete/:consultationId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consultationId = req.params.consultationId;
        const result = await consultationService.deleteConsultationById(Number(consultationId));
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
})

export { consultationRouter }