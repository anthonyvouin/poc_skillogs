import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Question } from '@prisma/client'

interface SuccessResponse {
  reponse: string
  trouve: boolean
}

interface ErrorResponse {
  error: string
}

interface ScoredQuestion extends Question {
  score: number
}

export async function POST(request: Request) {
  try {
    const { question } = (await request.json()) as { question?: string }
    
    if (!question) {
      return NextResponse.json<ErrorResponse>(
        { error: 'La question est requise' },
        { status: 400 }
      )
    }

    const normalizedQuestion: string = question
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    
    const motsAIgnorer: readonly string[] = [
      'le', 'la', 'les', 'de', 'du', 'des', 
      'un', 'une', 'et', 'ou', 'je', 'tu', 
      'il', 'elle'
    ] as const

    const motsQuestion: string[] = normalizedQuestion
      .split(/\s+/)
      .filter((mot: string): boolean => 
        mot.length > 2 && !motsAIgnorer.includes(mot)
      )

    const questions: Question[] = await prisma.question.findMany({
      where: {
        actif: true,
        OR: [
          {
            mots_cles: {
              hasSome: motsQuestion
            }
          },
          {
            question: {
              contains: normalizedQuestion,
              mode: 'insensitive'
            }
          }
        ]
      }
    })

    // Si on trouve des questions correspondantes
    if (questions.length > 0) {
      // Amélioration du scoring
      const scoredQuestions: ScoredQuestion[] = questions.map((q: Question): ScoredQuestion => ({
        ...q,
        score: q.mots_cles.filter((mot: string): boolean => 
          motsQuestion.includes(mot.toLowerCase())
        ).length + (q.question.toLowerCase().includes(normalizedQuestion) ? 3 : 0)
      }))

      const bestMatch: ScoredQuestion = scoredQuestions.reduce((prev, current): ScoredQuestion => 
        current.score > prev.score ? current : prev
      )

      return NextResponse.json<SuccessResponse>({
        reponse: bestMatch.reponse,
        trouve: true
      })
    }

    const config = await prisma.configuration.findFirst()
    return NextResponse.json<SuccessResponse>({
      reponse: config?.reponse_defaut || "Désolé, je ne peux pas répondre à cette question.",
      trouve: false
    })

  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json<ErrorResponse>(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
