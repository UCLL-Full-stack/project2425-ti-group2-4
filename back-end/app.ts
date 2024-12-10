import * as dotenv from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { patientRouter } from './controller/patient.routes';
import { doctorRouter } from './controller/doctor.routes';
import { officeRouter } from './controller/office.routes';
import { userRouter } from './controller/user.routes';
import { consultationRouter } from './controller/consultation.routes'
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

const app = express();

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        connectSrc: ['self', 'http://localhost:3000'],
    }
}))

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256']
    }).unless({
    path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status']
    })
);

app.use('/patients', patientRouter)
app.use('/doctors', doctorRouter)
app.use('/offices', officeRouter)
app.use('/consultations', consultationRouter)
app.use('/users', userRouter)

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Music API",
            version: "1.0.0",
        },
    },
    apis: ["./controller/*.routes.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err.name === "UnauthorizedError"){
        res.status(401).json({ status: "application error", message: err.message });
    }
    else{
        res.status(400).json({ status: "application error", message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Music API is running on port ${port}.`);
});




