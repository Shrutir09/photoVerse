import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import User from '../../../../models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please provide email and password' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user has a password (not OAuth user)
    if (!user.password) {
      return NextResponse.json(
        { error: 'Please sign in with your social account' },
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
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

