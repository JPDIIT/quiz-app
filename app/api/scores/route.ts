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
    const { score, start, end, quizId } = body

    const get_attempt = await prisma.scores.aggregate({
      _max: {
        attempt: true,
      },
      where: {
        quizId: quizId, 
      },
    })

    const nextAttempt = (get_attempt._max.attempt ?? 0) + 1;

    const scores = await prisma.scores.create({
      data: {
        quizId: quizId,
        score: score,
        starttime: new Date(start).toISOString(),
        endtime: new Date(end).toISOString(),
        attempt: nextAttempt
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