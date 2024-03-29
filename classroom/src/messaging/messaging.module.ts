import { Module } from '@nestjs/common'
import { CoursesService } from 'src/services/courses.service'
import { EnrollmentsService } from 'src/services/enrollments.service'
import { StudentsService } from 'src/services/students.service'
import { DatabaseModule } from '~database/database.module'
import { PurchaseController } from './controllers/purchases.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [StudentsService, CoursesService, EnrollmentsService],
})
export class MessagingModule { }
