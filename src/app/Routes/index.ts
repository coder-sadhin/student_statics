import { Router } from 'express';
import { AcademicSemesterRoutes } from '../Modules/AcademicSemester/AcademicSemester.route';
import { StudentRoute } from '../Modules/Students/student.route';
import { UserRoute } from '../Modules/User/user.route';

const router = Router();

const modulesRouter = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];
modulesRouter.forEach((route) => router.use(route.path, route.route));

// router.use('/users', UserRoute);
// router.use('/students', StudentRoute);

export default router;
