import path from 'node:path'
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { CoursesService } from 'src/services/courses.service'
import { EnrollmentsService } from 'src/services/enrollments.service'
import { StudentsService } from 'src/services/students.service'

import { DatabaseModule } from '~database/database.module'
import { CoursesResolver } from './graphql/resolvers/course.resolver'
import { EnrollmentsResolver } from './graphql/resolvers/enrollment.resolver'
import { StudentsResolver } from './graphql/resolvers/student.resolver'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.ggl'),
    }),
  ],
  providers: [
    // Resolvers
    CoursesResolver,
    EnrollmentsResolver,
    StudentsResolver,

    // Services
    EnrollmentsService,
    CoursesService,
    StudentsService,
  ],
})
export class HttpModule { }
