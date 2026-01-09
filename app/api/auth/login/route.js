import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import User from '../../../../models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'

export async function POST(request) {
  try {
    // Parse request body with error handling
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request body. Please provide valid JSON.' },
        { status: 400 }
      )
    }

    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      )
    }

    // Connect to database with error handling
    try {
      await connectDB()
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      return NextResponse.json(
        { error: 'Database connection failed', details: process.env.NODE_ENV === 'development' ? dbError.message : undefined },
        { status: 500 }
      )
    }

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString() },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    )

    // Return user data and token
    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          level: user.level,
          points: user.points,
          badges: user.badges,
          avatar: user.avatar,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { 
        error: 'Server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

