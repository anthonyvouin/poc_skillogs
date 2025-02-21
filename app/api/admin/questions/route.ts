import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      select: {
        id: true,
        categorie: true,
        question: true,
        reponse: true,
        mots_cles: true,
        actif: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: questions
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des questions:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la récupération des questions'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.question || !body.reponse || !body.categorie) {
      return NextResponse.json(
        {
          success: false,
          message: 'La question, la réponse et la catégorie sont requises'
        },
        { status: 400 }
      )
    }

    const newQuestion = await prisma.question.create({
      data: {
        question: body.question,
        reponse: body.reponse,
        categorie: body.categorie,
        mots_cles: body.mots_cles || []
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Question créée avec succès',
      data: newQuestion
    })

  } catch (error) {
    console.error('Erreur lors de la création de la question:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la création de la question'
      },
      { status: 500 }
    )
  }
} 