import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    await prisma.question.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Question supprimée avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la suppression de la question:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la suppression de la question'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()

    // Validation des données
    if (!body.question || !body.reponse || !body.categorie) {
      return NextResponse.json(
        {
          success: false,
          message: 'La question, la réponse et la catégorie sont requises'
        },
        { status: 400 }
      )
    }

    // Mise à jour de la question
    const updatedQuestion = await prisma.question.update({
      where: {
        id: id
      },
      data: {
        question: body.question,
        reponse: body.reponse,
        categorie: body.categorie,
        mots_cles: body.mots_cles || []
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Question mise à jour avec succès',
      data: updatedQuestion
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la question:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erreur lors de la mise à jour de la question'
      },
      { status: 500 }
    )
  }
} 