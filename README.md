# PHOTOSPHERE 🌱

**Where Sunlight Becomes Life**

An AI-powered, interactive web platform that helps users understand photosynthesis and how environmental factors affect plant life.

## Features

### 🌍 Live Simulation Lab
- Real-time photosynthesis simulation with animated visuals
- Interactive sliders for Sunlight, CO₂, and Temperature
- Dynamic plant growth visualization
- Floating oxygen bubbles
- Environment health indicators

### 📊 Data Visualization
- Live charts showing oxygen and photosynthesis rate over time
- Animated progress bars
- Plant health and environment balance indicators

### 🎮 Educational Games
1. **Balance the Earth** - Achieve balanced environment (70-75% rate)
2. **Oxygen Master** - Reach 80% oxygen with minimum temperature

### 📚 Learning Section
- **Interactive Learning Cards** - Click to learn about:
  - 🌞 Sunlight
  - 🌬 CO₂
  - 💧 Water
  - 🍃 Chlorophyll
  - 🍞 Glucose
  - 🌬 Oxygen

- **PhotoBot AI Tutor** 🤖🌱
  - Ask questions about photosynthesis
  - Get student-friendly explanations
  - Uses OpenAI API (with fallback responses)

### 🎨 UI Features
- 🌗 Light & Dark Mode (saves preference)
- 🌍 Language Toggle (English ↔ Hindi)
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 🎨 Glass-morphism design

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Recharts** (data visualization)
- **OpenAI API** (AI tutor)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd photosphere
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up OpenAI API key:
   - Create a `.env.local` file in the root directory
   - Add: `NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here`
   - Or enter it directly in the PhotoBot component

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app
 ├─ page.jsx              # Main page
 ├─ layout.jsx            # Root layout
 ├─ globals.css           # Global styles
 ├─ logic/
 │   └─ photosynthesis.js # Core calculation logic
 ├─ ai/
 │   └─ photobot.js       # AI tutor logic
 └─ components/
     ├─ Sliders.jsx       # Control panel
     ├─ PlantView.jsx     # Animated plant visualization
     ├─ OxygenMeter.jsx   # Oxygen display with bubbles
     ├─ EnvironmentStatus.jsx # Health indicators
     ├─ Charts.jsx        # Data visualization
     ├─ GameBalance.jsx   # Balance the Earth game
     ├─ GameOxygen.jsx    # Oxygen Master game
     ├─ LearningCards.jsx # Interactive learning cards
     ├─ PhotoBot.jsx      # AI tutor interface
     └─ LanguageToggle.jsx # Language switcher
```

## Core Formula

```
photosynthesisRate = (sunlight * co2) / temperature
```

From this, the app calculates:
- **Oxygen %** - Directly proportional to photosynthesis rate
- **Plant Health** - Based on rate thresholds:
  - < 30%: 🌱 Poor
  - 30-70%: 🌿 Average
  - > 70%: 🌳 Healthy
- **Environment Balance** - Based on rate thresholds:
  - < 30%: ❌ Imbalanced
  - 30-70%: ⚠️ Moderate
  - > 70%: ✅ Balanced

## Features in Detail

### Real-time Simulation
- All calculations update instantly as sliders move
- Smooth animations for all visual elements
- Background changes based on environment health

### Educational Games
- **Balance the Earth**: Challenge to achieve optimal environment
- **Oxygen Master**: Optimize oxygen production with temperature constraints
- Both games include scoring and success animations

### AI Tutor (PhotoBot)
- Powered by OpenAI GPT-3.5-turbo
- Fallback responses for common questions when API is unavailable
- Student-friendly explanations with examples

## Future Enhancements

The architecture is designed to be backend-ready for:
- User accounts and progress tracking
- Teacher dashboards
- Database integration
- Multiplayer features
- Advanced analytics

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for science education**

