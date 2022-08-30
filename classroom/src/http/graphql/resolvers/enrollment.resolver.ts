import { UseGuards } from '@nestjs/common'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CoursesService } from 'src/services/courses.service'
import { EnrollmentsService } from 'src/services/enrollments.service'
import { StudentsService } from 'src/services/students.service'
import { AuthorizationGuard } from '~http/auth/authorization.guard'
import { Enrollment } from '../models/enrollment.model'

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentService: EnrollmentsService,
    private courseService: CoursesService,
    private studentService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentService.listAllEnrollments()
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentService.getStudentById(enrollment.studentId)
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.courseService.getCourseById(enrollment.courseId)
  }
}
