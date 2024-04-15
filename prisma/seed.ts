import { PrismaClient } from '@prisma/client'
import * as users from "./seeding/users.json"
import * as courses from "./seeding/courses.json"
import * as user_courses from "./seeding/user_courses.json"

const prisma = new PrismaClient()

async function main() {

    await prisma.user.createMany({
        data: users
    })

    await prisma.courses.createMany({
        data: courses
    })

    await prisma.userCourses.createMany({
        data: user_courses
    })
}

main().then(async () => await prisma.$disconnect())