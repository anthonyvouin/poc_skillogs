import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  message: string
  token?: string
  expiresIn?: number
}

interface JWTPayload {
  id: string
  email: string
  nom: string
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables')
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = 30 * 24 * 60 * 60 

export async function POST(request: Request) {
  try {
    const body = await request.json() as LoginRequest
    
    if (!body.email || !body.password) {
      return NextResponse.json<LoginResponse>(
        { 
          success: false, 
          message: 'Email et mot de passe requis' 
        },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email }
    })

    if (!user) {
      return NextResponse.json<LoginResponse>(
        { 
          success: false, 
          message: 'Identifiants invalides' 
        },
        { status: 401 }
      )
    }

    const isValidPassword: boolean = await bcrypt.compare(body.password, user.password)

    if (!isValidPassword) {
      return NextResponse.json<LoginResponse>(
        { 
          success: false, 
          message: 'Identifiants invalides' 
        },
        { status: 401 }
      )
    }

    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      nom: user.nom
    }

    const token : string = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN 
    })

    return NextResponse.json<LoginResponse>({
      success: true,
      message: 'Connexion réussie',
      token: token,
      expiresIn: JWT_EXPIRES_IN
    })

  } catch (error) {
    console.error('Erreur de login:', error)
    return NextResponse.json<LoginResponse>(
      { 
        success: false, 
        message: 'Erreur interne du serveur' 
      },
      { status: 500 }
    )
  }
} 