import { PrismaClient } from '../../generated/prisma'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

// GET /api/scores - Get all scores
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeItems = searchParams.get('include_items') === 'true'

    const scores = await prisma.scores.findMany({
      orderBy: {
        id: 'asc'
      }
    })

    return Response.json({
      success: true,
      data: scores,
      count: scores.length
    })
  } catch (error) {
    console.error('Error fetching scores:', error)
    return Response.json({
      success: false,
      message: 'Failed to fetch scores',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST /api/scores - Add quiz score
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { start, end, quizId, session } = body

    //Calculate attempt
    const get_attempt = await prisma.scores.aggregate({
      _max: {
        attempt: true,
      },
      where: {
        quizId: quizId, 
      },
    })

    const nextAttempt = (get_attempt._max.attempt ?? 0) + 1

    //Score quiz
    //Get total questions
    const calc_total = await prisma.questionBank.aggregate({
      _count: {
        question: true,
      },
      where: {
        quizId: quizId, 
      },
    })

    const totalq = (calc_total._count.question ?? 0)

    //Get number of correct responses
    const calc_correct = await prisma.responses.aggregate({
      _count: {
        correct: true,
      },
      where: {
        AND: [
          {session: session},
          {correct: true}
        ]         
      },
    })

    const total_correct = (calc_correct._count.correct ?? 0)

    if (isNaN(total_correct)) {
      return Response.json({
        success: false,
        message: 'Error calculating score'
      }, { status: 400 })
    }

    //Score quiz
    let score = (total_correct / totalq) * 100
    console.log(score)

    const scores = await prisma.scores.create({
      data: {
        quizId: quizId,
        score: score,
        starttime: new Date(start).toISOString(),
        endtime: new Date(end).toISOString(),
        attempt: nextAttempt
      }
    })

    //Average all the scores for this quiz
    const avg = await prisma.scores.aggregate({
      _avg: {
        score: true,
      },
      where: {
        quizId: quizId
      }
    })

    const avg_score = (avg._avg.score ?? 0)

    //Update quiz with current (latest) and average scores
    const current_score = await prisma.quiz.update({
      data: {
        currentScore: score,
        averageScore: avg_score
      },
      where: {
        id: quizId
      }
    })

    return Response.json({
      success: true,
      message: 'Score added successfully',
      data: scores
    }, { status: 201 })
  } catch (error) {
    console.error('Error adding score:', error)
    return Response.json({
      success: false,
      message: 'Failed to add score',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}