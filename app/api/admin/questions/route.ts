import { NextResponse } from 'next/server'
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