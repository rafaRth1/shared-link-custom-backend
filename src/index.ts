import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user-routes.js';
import bioRoutes from './routes/bio-routes.js';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use(cors());

const PORT = process.env.PORT || 4000;

app.use('/user', userRoutes);
app.use('/bio', bioRoutes);

app.listen(PORT, () => {
	console.log(`servidor corriendo en el puerto ${PORT}`);
});
