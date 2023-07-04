import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoute = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semisters',
    route: AcademicSemisterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoute.forEach(route => router.use(route.path, route.route));

export default router;
