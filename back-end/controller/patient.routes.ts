import express, {NextFunction, Request, Response} from 'express';
import patientService from '../service/patient.service';
import { PatientInput } from '../types';

const patientRouter = express.Router();

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get a list of all patients.
 *     responses: 
 *       '200':
 *         description: A list of patients.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 */
patientRouter.get("/", async (req: Request, res:Response, next: NextFunction) => {
    try {

        const patients = await patientService.getPatients();
        res.status(200).json(patients);
    }
    catch (error) {
        next(error);
    }
});

patientRouter.get("/:patientId", async (req: Request, res:Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;
        const patient = await patientService.getPatientById(Number(patientId));
        res.status(200).json(patient);
    }
    catch (error) {
        next(error);
    }
});

patientRouter.post("/add", async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const patient = <PatientInput>req.body;
        const result = await patientService.createPatient(patient);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
})

patientRouter.delete("/delete/:patientId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = req.params.patientId;
        const result = await patientService.deletePatientById(Number(patientId));
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
})

// patientRouter.put("/update", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const patient= <PatientInput>req.body;
//         const result = await patientService.updatePatient(patient);
//         res.status(201).json(result);
//     }
//     catch (error) {
//         next(error);
//     }
// })

export {patientRouter};
