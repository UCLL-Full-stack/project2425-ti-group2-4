import express, {NextFunction, Request, Response} from 'express';
import doctorService from '../service/doctor.service'
import { DoctorInput } from '../types';

const doctorRouter = express.Router();

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get a list of all doctors.
 *     responses: 
 *       '200':
 *         description: A list of doctors.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/doctor'
 */
doctorRouter.get("/", async (req: Request, res:Response, next: NextFunction) => {
    try {

        const doctors = await doctorService.getDoctors();
        res.status(200).json(doctors);
    }
    catch (error) {
        next(error);
    }
});

// doctorRouter.get("/:doctorId", async (req: Request, res:Response, next: NextFunction) => {
//     try {
//         const doctorId = req.params.doctorId;
//         const doctor = await doctorService.getdoctorById(Number(doctorId));
//         res.status(200).json(doctor);
//     }
//     catch (error) {
//         next(error);
//     }
// });

doctorRouter.post("/add", async (req: Request, res:Response, next: NextFunction) => { 
    try {
        const doctor = <DoctorInput>req.body;
        const result = await doctorService.createDoctor(doctor);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
})

// doctorRouter.delete("/delete/:doctorId", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const doctorId = req.params.doctorId;
//         const result = await doctorService.deletedoctorById(Number(doctorId));
//         res.status(201).json(result);
//     }
//     catch (error) {
//         next(error);
//     }
// })

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
