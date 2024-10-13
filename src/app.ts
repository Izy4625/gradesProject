import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './services/database';
import authRoutes from './routes/authRoutes'
import teacherRouter from './routes/teacherRoutes';
// import userRoutes from './routes/userRoutes'
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';




dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Employees Project',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3010'
            },
        ]
    },
    apis: ['./src/routes/*.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))


connectToDatabase();

app.use('/auth', authRoutes);
app.use('/users', teacherRouter);
// app.use('/users', userRoutes)

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})