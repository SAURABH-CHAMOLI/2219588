import { Log } from '../services/logService.js';

const logRequest = async (req, res, next) => {
  const begin = Date.now();

  res.on('finish', async () => {
    const timeTaken = Date.now() - begin;
    await Log("backend", "info", "middleware", `${req.method} ${req.originalUrl} took ${timeTaken}ms`);

    if (res.statusCode >= 400) {
      await Log("backend", "error", "middleware", `Status ${res.statusCode} at ${req.originalUrl}`);
    }
  });

  next();
};

export default logRequest;
