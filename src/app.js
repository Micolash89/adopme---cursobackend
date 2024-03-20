import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import __dirname from './index.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import config from './config/config.js';
import cors from 'cors';

//modificar el cors para que me admita dotas la url
app.use(cors({ origin: true, credentials: true }));


const app = express();
const PORT = config.port || 8081;
mongoose.set('strictQuery', false);
const connection = mongoose.connect(config.mongoUrl);
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación del poder y del saber",
            //   version:"1.0.0",
            description: "API pensada para clase de Swagger"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));


app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
