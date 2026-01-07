# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: (Optional) Set Up OpenAI API Key

For the PhotoBot AI tutor feature, you can optionally set up an OpenAI API key:

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in the root directory
3. Add this line:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
   ```

**Note:** PhotoBot will work without an API key using fallback responses for common questions. You can also enter the API key directly in the PhotoBot component interface.

## Step 3: Run the Development Server

```bash
npm run dev
```

## Step 4: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Features to Try

1. **Live Simulation Tab:**
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

