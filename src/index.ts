import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user-routes.js';
import bioRoutes from './routes/bio-routes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

//

connectDB();

// Config Cors
const whitelist = [
	process.env.FRONTEND_URL_PRD,
	process.env.FRONTEND_URL_DEV,
	process.env.FRONTEND_URL_PRD_TEST,
];

const corsOptions = {
	origin: function (origin: any, callback: any) {
		if (whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Error de cors'));
		}
	},
};

app.use(cors(corsOptions));

// Directorio Publico
app.use(express.static('/dist/public'));

const PORT = process.env.PORT || 4000;

app.use('/user', userRoutes);
app.use('/bio', bioRoutes);

app.get('*', (req, res) => {
	res.sendFile(__dirname + '/dist/public/index.html');
});

app.listen(PORT, () => {
	console.log(`servidor corriendo en el puerto ${PORT}`);
});

export default app;
