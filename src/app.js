import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import errorHandler from './middlewares/errorHandler.js';
import studentRoutes from './routes/studentRoutes.js';
import logger from './utils/logger.js';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
prisma.$connect()
  .then(() => logger.info('Connected to MongoDB via Prisma'))
  .catch(err => {
    logger.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Routes
app.use('/students', studentRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});