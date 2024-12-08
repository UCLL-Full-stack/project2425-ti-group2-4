import express, {NextFunction, Request, Response} from 'express';
import consultationService from '../service/consultation.service';
import { ConsultationInput } from '../types';

const consultationRouter = express.Router();

/**
 * @swagger
 * /consultations:
 *   get:
 *     summary: Get a list of all consultations.
 *     responses: 
 *       '200':
 *         description: A list of consultations.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/consultation'
 */
consultationRouter.get("/", async (req: Request, res:Response, next: NextFunction) => {
    try {

        const consultations = await consultationService.getConsultations();
        res.status(200).json(consultations);
    }
    catch (error) {
        next(error);
    }
});

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

export { consultationRouter }