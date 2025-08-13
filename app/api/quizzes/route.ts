import { PrismaClient } from '../../generated/prisma'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

// GET /api/quizzes - Get all quizzes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeItems = searchParams.get('include_items') === 'true'

    const quizzes = await prisma.quiz.findMany({
      orderBy: {
        id: 'asc'
      }
    })

    return Response.json({
      success: true,
      data: quizzes,
      count: quizzes.length
    })
  } catch (error) {
    console.error('Error fetching quizzes:', error)
    return Response.json({
      success: false,
      message: 'Failed to fetch quizzes',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST /api/quizzes - Create a new quiz
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, subject } = body
    
    if (!name || typeof name !== 'string') {
      return Response.json({
        success: false,
        message: 'Name is required and must be a string'
      }, { status: 400 })
    }

    if (!subject || typeof subject !== 'string') {
      return Response.json({
        success: false,
        message: 'subject is required and must be a string'
      }, { status: 400 })
    }

    const quiz = await prisma.quiz.create({
      data: {
        name: name.trim(),
        subject: subject.trim(),
        currentScore: 0.0,
        averageScore: 0.0,
        active: true,
      },
    })

    return Response.json({
      success: true,
      message: 'Quiz created successfully',
      data: quiz
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating quiz:', error)
    return Response.json({
      success: false,
      message: 'Failed to create quiz',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}