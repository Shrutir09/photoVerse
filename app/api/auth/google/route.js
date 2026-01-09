import { NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'
import connectDB from '../../../../lib/mongodb'
import User from '../../../../models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

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

    const { token: googleToken } = body

    // Validate input
    if (!googleToken) {
      return NextResponse.json(
        { error: 'Google token is required' },
        { status: 400 }
      )
    }

    if (!GOOGLE_CLIENT_ID) {
      console.error('GOOGLE_CLIENT_ID is not set in environment variables')
      return NextResponse.json(
        { error: 'Google OAuth is not configured on the server' },
        { status: 500 }
      )
    }

    // Verify Google token
    const client = new OAuth2Client(GOOGLE_CLIENT_ID)
    let ticket
    try {
      ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: GOOGLE_CLIENT_ID,
      })
    } catch (verifyError) {
      console.error('Google token verification error:', verifyError)
      return NextResponse.json(
        { error: 'Invalid Google token' },
        { status: 401 }
      )
    }

    const payload = ticket.getPayload()
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid Google token payload' },
        { status: 401 }
      )
    }

    const { sub: googleId, email, name, picture } = payload

    if (!email) {
      return NextResponse.json(
        { error: 'Email not provided by Google' },
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

    // Find or create user
    let user = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { providerId: googleId, provider: 'google' }
      ]
    })

    if (user) {
      // User exists - update if needed
      if (user.provider !== 'google') {
        // User exists with local auth, update to Google
        user.provider = 'google'
        user.providerId = googleId
        if (picture) user.avatar = picture
        await user.save()
      } else if (!user.providerId) {
        // User exists with Google but missing providerId
        user.providerId = googleId
        if (picture) user.avatar = picture
        await user.save()
      } else if (picture && user.avatar !== picture) {
        // Update avatar if changed
        user.avatar = picture
        await user.save()
      }
    } else {
      // Create new user
      try {
        user = await User.create({
          name: name || email.split('@')[0],
          email: email.toLowerCase(),
          provider: 'google',
          providerId: googleId,
          avatar: picture || null,
        })
      } catch (createError) {
        // Handle duplicate email error (race condition)
        if (createError.code === 11000) {
          // User was created between findOne and create, try to find again
          user = await User.findOne({ 
            $or: [
              { email: email.toLowerCase() },
              { providerId: googleId, provider: 'google' }
            ]
          })
          
          if (!user) {
            throw createError
          }
          
          // Update existing user
          if (user.provider !== 'google') {
            user.provider = 'google'
            user.providerId = googleId
          }
          if (picture) user.avatar = picture
          await user.save()
        } else {
          throw createError
        }
      }
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
        message: 'Authentication successful',
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
      { 
        error: 'Server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

