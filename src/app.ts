/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import GlobalErrorHandler from './app/Middlewares/globalErrorHandler';
import NotFound from './app/Middlewares/notFound';
// import { StudentRoute } from './app/Modules/Students/student.route';
import { UserRoute } from './app/Modules/User/user.route';
import router from './app/Routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application route
// app.use('/api/v1/students', StudentRoute);
// app.use('/api/v1/users', UserRoute);
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.json({
    Operation: 'Success',
  });
});

// global error handler
app.use(GlobalErrorHandler);

// not found route
app.use(NotFound);

export default app;
