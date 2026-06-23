import express from 'express'
import dotenv from 'dotenv'
import sequelize from './config/db';
import User from './models/User.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import uploadRoutes from './routes/upload.routes.js';

dotenv.config()
app.use(cors());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

sequelize.sync();

app.get('/', (req, res) => {
    res.send('home page');
});
app.get('/about', (req, res) => {
    res.send('about page');
});
// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); // No raw SQL needed!
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.use('/api/uploads', uploadRoutes);
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

export default app