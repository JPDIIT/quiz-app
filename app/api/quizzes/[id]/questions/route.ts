import { PrismaClient } from '../../../../generated/prisma'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

// GET /api/questions - Get all questions for a quiz
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quizId = parseInt((await params).id)

    if (isNaN(quizId)) {
      return Response.json({
        success: false,
        message: 'Invalid quiz ID format'
      }, { status: 400 })
    }

    // Check if quiz exists
    const quizExists = await prisma.quiz.findUnique({
      where: { id: quizId }
    })

    if (!quizExists) {
      return Response.json({
        success: false,
        message: 'Quiz not found'
      }, { status: 404 })
    }

    const questions = await prisma.questionBank.findMany({
      where: {quizId: quizId},
      orderBy: {
        q_num: 'asc'
      }
    })

    //Calculate session
    const get_session = await prisma.responses.aggregate({
      _max: {
        session: true,
      }
    })

    const session = (get_session._max.session ?? 0) + 1

    return Response.json({
      success: true,
      data: questions,
      count: questions.length,
      session: session
    })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return Response.json({
      success: false,
      message: 'Failed to fetch questions',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}