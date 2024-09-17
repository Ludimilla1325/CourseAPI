import express from 'express';
import courseRoutes from './routes/CourseRoute';
import userRoutes from './routes/UserRoute';

const app = express();
app.use(express.json());
app.use(courseRoutes);
app.use(userRoutes);

export default app;