import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CoursesService } from 'src/services/courses.service'
import { EnrollmentsService } from 'src/services/enrollments.service'
import { StudentsService } from 'src/services/students.service'
import { AuthorizationGuard } from '~http/auth/authorization.guard'
import { AuthUser, CurrentUser } from '~http/auth/current-user'
import { CreateCourseInput } from '../inputs/create-course.input'
import { Course } from '../models/course.model'

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private courseService: CoursesService,
    private studentService: StudentsService,
    private enrollmentService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.courseService.listAllCourses()
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.getStudentByAuthUserId(user.sub)

    if (!student) throw new Error('Student not found')

    const enrollment = await this.enrollmentService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    })

    if (!enrollment) throw new UnauthorizedException()

    return this.courseService.getCourseById(id)
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.courseService.createCourse(data)
  }
}
