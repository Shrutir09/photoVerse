# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up MongoDB

1. **Create a MongoDB Database:**
   - Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended for cloud hosting)
   - Or install MongoDB locally on your machine

2. **Get Your Connection String:**
   - If using MongoDB Atlas:
     - Create a new cluster
     - Click "Connect" → "Connect your application"
     - Copy the connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)
   - If using local MongoDB:
     - Use: `mongodb://localhost:27017/photosphere`

3. **Set Up Environment Variables:**
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string_here
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     JWT_EXPIRE=7d
     ```
   - Generate a secure JWT secret (you can use: `openssl rand -base64 32`)

## Step 3: Set Up Google OAuth (Optional but Recommended)

To enable "Sign in with Google" functionality:

1. **Create a Google OAuth 2.0 Client ID:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the "Google+ API" (or "Google Identity Services API")
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Choose "Web application" as the application type
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - Your production domain (e.g., `https://yourdomain.com`)
   - Add authorized redirect URIs:
     - `http://localhost:3000` (for development)
     - Your production domain
   - Copy the Client ID

2. **Add to Environment Variables:**
   - Add these lines to your `.env.local` file:
     ```
     GOOGLE_CLIENT_ID=your_google_client_id_here
     NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
     ```
   - **Important:** Use the same Client ID for both variables

**Note:** Without Google OAuth configured, users can still sign up/login with email and password. The Google button will be disabled.

## Step 4: (Optional) Set Up OpenAI API Key

For the PhotoBot AI tutor feature, you can optionally set up an OpenAI API key:

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add this line to your `.env.local` file:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
   ```

**Note:** PhotoBot will work without an API key using fallback responses for common questions. You can also enter the API key directly in the PhotoBot component interface.

## Step 5: Run the Development Server

```bash
npm run dev
```

## Step 6: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Authentication

The app now includes full authentication with MongoDB:
- **Sign Up:** Create a new account with email and password
- **Sign In:** Login with your credentials
- **Google OAuth:** Sign in/up with your Google account (if configured)
- **Protected Routes:** Some pages require authentication
- **JWT Tokens:** Secure token-based authentication
- **User Profiles:** Track your level, points, and badges

## Features to Try

1. **Authentication:**
   - Sign up for a new account with email/password
   - Login with your credentials
   - Sign in/up with Google (if configured)
   - Access protected features

2. **Live Simulation Tab:**
   - Adjust the sliders (Sunlight, CO₂, Temperature)
   - Watch the plant grow/shrink in real-time
   - See oxygen bubbles float up
   - Check the data panels and charts

2. **Games Tab:**
   - Play "Balance the Earth" - achieve 70-75% photosynthesis rate
   - Play "Oxygen Master" - reach 80% oxygen with temp ≤ 30

3. **Learning Tab:**
   - Click on learning cards to explore concepts
   - Ask PhotoBot questions about photosynthesis
   - Try example questions or ask your own

4. **UI Features:**
   - Toggle between Light/Dark mode (top right)
   - Switch between English/Hindi (top right)
   - All preferences are saved in localStorage

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

- **Charts not showing?** Wait a few seconds for data to accumulate
- **Animations not smooth?** Check browser console for errors
- **PhotoBot not responding?** Make sure you've entered a valid OpenAI API key or try the example questions

Enjoy exploring PHOTOSPHERE! 🌱

