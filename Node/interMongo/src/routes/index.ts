import { Router, type Request, type Response, type NextFunction } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import UserModel from '../models/User.model.js';
const router = Router();

// ============ Server Health ================
router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
   try {
    const existingUsers = await UserModel.countDocuments();

    if (existingUsers > 0) {
      return res.json({
        message: 'Users already exist',
        count: existingUsers
      });
    }

    const users = await UserModel.insertMany([
      {
        display_name: 'John Doe',
        first_name: 'John',
        last_name: 'Doe',
        slug: 'john-doe',
        email: 'john@exa44mple.com',
        password: '123456'
      },
      {
        display_name: 'Sarah Smith',
        first_name: 'Sarah',
        last_name: 'Smith',
        slug: 'sarah-smith',
        email: 'sarah@exam4ple.com',
        password: '123456'
      },
      {
        display_name: 'Ali Khan',
        first_name: 'Ali',
        last_name: 'Khan',
        slug: 'ali-khan',
        email: 'ali@examp4le.com',
        password: '123456'
      }
    ]);

    res.json({
      message: 'Users inserted successfully',
      count: users
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Insert failed' });
  }
});




router.get('/seed-users', async (_req: Request, res: Response) => {

});

/* ================= MODULE ROUTES ================= */
// router.use('/auth', authRoutes);




export default router;
