import { Query, Resolver } from '@nestjs/graphql';
import { CourseEntity } from 'src/entities/courses/course.entity/course.entity';
import { CourseService } from 'src/services/course/course.service';

@Resolver()
export class CoursesResolver {

    constructor(private courseService: CourseService) { }

    /**
     * 
     * @returns all the courses
     */
    @Query(() => [CourseEntity], { name: "courses" })
    async courses() {
        return this.courseService.getCourses()
    }
}
