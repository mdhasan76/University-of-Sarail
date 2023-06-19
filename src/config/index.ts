import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') }) // cwd: current directory

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
}
