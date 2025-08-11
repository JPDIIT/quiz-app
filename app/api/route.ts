import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Test Prisma connection by querying quiz table
    const quizzes = await prisma.quiz.findMany({
      where: {name: 'test'}
    })

    return Response.json({
      success: true,
      message: 'Prisma is working!',
      data: quizzes,
      count: quizzes.length
    })
  } catch (error) {
    console.error('Prisma error:', error)
    return Response.json({
      success: false,
      message: 'Failed to connect to database',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}