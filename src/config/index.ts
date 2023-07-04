import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') }); // cwd: current directory

export default {
  mode: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  default_bcrypt_round: process.env.BCRYPT_SALT_ROUNDS,
};
