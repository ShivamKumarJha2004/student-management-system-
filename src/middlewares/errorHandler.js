import logger from '../utils/logger.js';


export default (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.message.includes('unique')) {
    return res.status(409).json({ message: err.message });
  }

  res.status(500).json({ 
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};