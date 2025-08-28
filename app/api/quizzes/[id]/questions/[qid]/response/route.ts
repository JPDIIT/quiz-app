import { PrismaClient } from '../../../../../../generated/prisma'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

// POST /api/quizzes/[id]/questions/[qid]/response - Answer a question
export async function POST(
  request: NextRequest,
  { params }: { params: { qid: string } }
) {
  try {
    const questionId = parseInt(await params.qid)
    
    if (isNaN(questionId)) {
      return Response.json({
        success: false,
        message: 'Invalid question ID format'
      }, { status: 400 })
    }

    const body = await request.json()
    const { response, session } = body
    let correct = false

    if (!response || typeof response !== 'string') {
      return Response.json({
        success: false,
        message: 'Response is required and must be a string'
      }, { status: 400 })
    }

    // Check if question exists
    const questionExists = await prisma.questionBank.findUnique({
      where: { id: questionId }
    })

    if (!questionExists) {
      return Response.json({
        success: false,
        message: 'Question not found'
      }, { status: 404 })
    }

    //Get answer
    const get_answer = await prisma.questionBank.findUnique({
        select: {
            correct_answer: true
        },
        where: {
            id: questionId
        }
    })

    const answer = (get_answer?.correct_answer ?? "")

    //Check answer
    if (answer === response){
        correct = true
    }

    const postResponse = await prisma.responses.create({
      data: {
        response: response.trim(),
        questId: questionId,
        session: session,
        correct: correct
      }
    })

    return Response.json({
      success: true,
      message: 'Response submitted successfully',
      data: postResponse
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting response:', error)
    return Response.json({
      success: false,
      message: 'Failed to submit response',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}