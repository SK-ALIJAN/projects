import { Router, type Request, type Response, type NextFunction } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
const router = Router();

// ============ Server Health ================
router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  const data = { version: '1.0.0' };
  res.render('home/welcome');
});

/* ================= MODULE ROUTES ================= */
// router.use('/auth', authRoutes);




export default router;
