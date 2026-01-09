import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/mongodb'
import User from '../../../../models/User'
import jwt from 'jsonwebtoken'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'

export async function POST(request) {
  try {
    const { credential } = await request.json()

    if (!credential) {
      return NextResponse.json(
        { error: 'No credential provided' },
        { status: 400 }
      )
    }

    // Verify Google ID token
    // In production, you should verify the token with Google's servers
    // For now, we'll decode it to get user info (not secure for production!)
    let decodedToken
    try {
      // Decode without verification (for development only)
      // In production, use: https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=CREDENTIAL
      const parts = credential.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid token format')
      }
      // Use Node.js Buffer (available in Next.js API routes)
      const buffer = Buffer.from(parts[1], 'base64')
      decodedToken = JSON.parse(buffer.toString('utf-8'))
    } catch (error) {
      console.error('Token decode error:', error)
      return NextResponse.json(
        { error: 'Invalid Google token' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    const { email, name, picture, sub } = decodedToken

    if (!email) {
      return NextResponse.json(
        { error: 'Email not found in Google token' },
        { status: 400 }
      )
    }

    // Find or create user
    let user = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { providerId: sub }
      ]
    })

    if (user) {
      // Update user info if needed
      if (!user.providerId) {
        user.providerId = sub
        user.provider = 'google'
        if (picture) user.avatar = picture
        await user.save()
      }
    } else {
      // Create new user
      user = await User.create({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        provider: 'google',
        providerId: sub,
        avatar: picture || null,
        // No password for OAuth users
      })
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
        message: 'Google authentication successful',
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
    console.error('Google auth error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

