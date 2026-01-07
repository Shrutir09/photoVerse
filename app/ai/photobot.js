/**
 * PhotoBot AI Tutor
 * Uses OpenAI API to answer questions about photosynthesis
 */

const SYSTEM_PROMPT = `You are PhotoBot, a friendly AI tutor specializing in photosynthesis and plant biology. 
Your role is to explain scientific concepts in simple, student-friendly language. 
Always use examples and connect your answers to real-world scenarios.
Keep responses concise (2-3 paragraphs) and engaging.`;

export async function askPhotoBot(question, apiKey) {
  if (!apiKey) {
    return {
      answer: "Please add your OpenAI API key in the environment variables to use PhotoBot.",
      error: "API key not configured"
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      answer: data.choices[0].message.content,
      error: null,
    };
  } catch (error) {
    return {
      answer: "Sorry, I'm having trouble connecting right now. Please check your API key and try again.",
      error: error.message,
    };
  }
}

// Fallback responses for common questions (when API is not available)
export const fallbackResponses = {
  'how does photosynthesis work': `Photosynthesis is how plants make their food! Plants use sunlight, water, and carbon dioxide (CO₂) to create glucose (sugar) and oxygen. This amazing process happens in the leaves, inside tiny structures called chloroplasts. The green color you see in leaves comes from chlorophyll, which captures sunlight energy.`,
  
  'why do plants need sunlight': `Sunlight is like the power source for plants! Just like you need food for energy, plants need sunlight to power the photosynthesis process. Without sunlight, plants can't make glucose (their food) or produce oxygen. That's why plants grow towards the light - they're reaching for their energy source!`,
  
  'what happens if co2 is high': `When CO₂ levels are high, plants can photosynthesize more efficiently! This means they can make more food and produce more oxygen. However, too much CO₂ in the atmosphere can also affect the Earth's temperature. It's all about balance - plants need CO₂, but the right amount is important for our planet's health.`,
  
  'how do plants make food': `Plants make food through photosynthesis! They combine carbon dioxide from the air, water from their roots, and energy from sunlight to create glucose (a type of sugar). This glucose is the plant's food, which it uses to grow and stay healthy. The amazing part? While making food, plants also produce oxygen that we breathe!`,
};

