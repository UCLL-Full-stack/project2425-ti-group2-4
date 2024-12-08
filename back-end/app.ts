import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { patientRouter } from './controller/patient.routes';
import { doctorRouter } from './controller/doctor.routes';
import { officeRouter } from './controller/office.routes';
import { consultationRouter } from './controller/consultation.routes'



const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/patients', patientRouter)
app.use('/doctors', doctorRouter)
app.use('/offices', officeRouter)
app.use('/consultations', consultationRouter)

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
