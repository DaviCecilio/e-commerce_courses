import { UseGuards } from '@nestjs/common'
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql'

import { EnrollmentsService } from 'src/services/enrollments.service'
import { StudentsService } from 'src/services/students.service'
import { AuthorizationGuard } from '~http/auth/authorization.guard'
import { Student } from '../models/student.model'

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentService.listAllStudents()
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudent(student.id)
  }
}
