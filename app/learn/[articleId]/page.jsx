'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'

const articles = {
  'photosynthesis-basics': {
    title: 'Photosynthesis Basics',
    icon: '🌱',
    color: 'from-green-500 to-emerald-500',
    content: {
      en: {
        heading: 'What is Photosynthesis?',
        intro: 'Photosynthesis is the process by which plants convert light energy into chemical energy, producing glucose and oxygen.',
        points: [
          'Plants use sunlight, water, and carbon dioxide to create glucose (sugar)',
          'Oxygen is released as a byproduct that we breathe',
          'This process occurs in the chloroplasts of plant cells',
          'Chlorophyll, the green pigment, captures light energy',
          'Photosynthesis is essential for life on Earth',
        ],
        conclusion: 'Without photosynthesis, there would be no oxygen in our atmosphere, and life as we know it would not exist.',
      },
      hi: {
        heading: 'प्रकाश संश्लेषण क्या है?',
        intro: 'प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा पौधे प्रकाश ऊर्जा को रासायनिक ऊर्जा में परिवर्तित करते हैं, ग्लूकोज और ऑक्सीजन का उत्पादन करते हैं।',
        points: [
          'पौधे ग्लूकोज (चीनी) बनाने के लिए सूरज की रोशनी, पानी और कार्बन डाइऑक्साइड का उपयोग करते हैं',
          'ऑक्सीजन एक उप-उत्पाद के रूप में निकलती है जिसे हम सांस लेते हैं',
          'यह प्रक्रिया पौधे की कोशिकाओं के क्लोरोप्लास्ट में होती है',
          'क्लोरोफिल, हरा वर्णक, प्रकाश ऊर्जा को पकड़ता है',
          'प्रकाश संश्लेषण पृथ्वी पर जीवन के लिए आवश्यक है',
        ],
        conclusion: 'प्रकाश संश्लेषण के बिना, हमारे वायुमंडल में ऑक्सीजन नहीं होगी, और जीवन जैसा हम जानते हैं, मौजूद नहीं होगा।',
      },
    },
  },
  'carbon-cycle': {
    title: 'Carbon Cycle',
    icon: '🌍',
    color: 'from-gray-600 to-gray-700',
    content: {
      en: {
        heading: 'Understanding the Carbon Cycle',
        intro: 'The carbon cycle describes how carbon moves through Earth\'s atmosphere, oceans, land, and living organisms.',
        points: [
          'Plants absorb CO₂ from the atmosphere during photosynthesis',
          'Carbon is stored in plant tissues and soil',
          'Animals consume plants, transferring carbon through the food chain',
          'Decomposition releases carbon back into the atmosphere',
          'Human activities have increased atmospheric CO₂ levels',
        ],
        conclusion: 'Maintaining a balanced carbon cycle is crucial for climate stability and ecosystem health.',
      },
      hi: {
        heading: 'कार्बन चक्र को समझना',
        intro: 'कार्बन चक्र बताता है कि कार्बन पृथ्वी के वायुमंडल, महासागरों, भूमि और जीवित जीवों के माध्यम से कैसे चलता है।',
        points: [
          'पौधे प्रकाश संश्लेषण के दौरान वायुमंडल से CO₂ अवशोषित करते हैं',
          'कार्बन पौधे के ऊतकों और मिट्टी में संग्रहीत होता है',
          'जानवर पौधों का सेवन करते हैं, खाद्य श्रृंखला के माध्यम से कार्बन स्थानांतरित करते हैं',
          'अपघटन कार्बन को वापस वायुमंडल में छोड़ता है',
          'मानव गतिविधियों ने वायुमंडलीय CO₂ स्तर में वृद्धि की है',
        ],
        conclusion: 'संतुलित कार्बन चक्र बनाए रखना जलवायु स्थिरता और पारिस्थितिकी तंत्र के स्वास्थ्य के लिए महत्वपूर्ण है।',
      },
    },
  },
  'oxygen-cycle': {
    title: 'Oxygen Cycle',
    icon: '💨',
    color: 'from-blue-500 to-cyan-500',
    content: {
      en: {
        heading: 'The Oxygen Cycle',
        intro: 'Oxygen cycles through Earth\'s systems, being produced by plants and consumed by animals and other processes.',
        points: [
          'Plants produce oxygen during photosynthesis',
          'Animals and humans breathe in oxygen and exhale CO₂',
          'Oxygen is also used in combustion and decomposition',
          'Oceans produce about 50-70% of Earth\'s oxygen',
          'Forests are vital oxygen producers on land',
        ],
        conclusion: 'The balance between oxygen production and consumption is essential for life on Earth.',
      },
      hi: {
        heading: 'ऑक्सीजन चक्र',
        intro: 'ऑक्सीजन पृथ्वी की प्रणालियों के माध्यम से चक्र करती है, पौधों द्वारा उत्पादित और जानवरों और अन्य प्रक्रियाओं द्वारा उपभोग की जाती है।',
        points: [
          'पौधे प्रकाश संश्लेषण के दौरान ऑक्सीजन का उत्पादन करते हैं',
          'जानवर और मनुष्य ऑक्सीजन में सांस लेते हैं और CO₂ छोड़ते हैं',
          'ऑक्सीजन का उपयोग दहन और अपघटन में भी किया जाता है',
          'महासागर पृथ्वी की लगभग 50-70% ऑक्सीजन का उत्पादन करते हैं',
          'जंगल भूमि पर महत्वपूर्ण ऑक्सीजन उत्पादक हैं',
        ],
        conclusion: 'ऑक्सीजन उत्पादन और खपत के बीच संतुलन पृथ्वी पर जीवन के लिए आवश्यक है।',
      },
    },
  },
  'ecosystem-balance': {
    title: 'Ecosystem Balance',
    icon: '⚖️',
    color: 'from-emerald-500 to-green-500',
    content: {
      en: {
        heading: 'Maintaining Ecosystem Balance',
        intro: 'Ecosystems maintain balance through complex interactions between plants, animals, and their environment.',
        points: [
          'Plants produce oxygen and food for animals',
          'Animals provide CO₂ and nutrients for plants',
          'Decomposers recycle nutrients back into the soil',
          'Biodiversity ensures ecosystem resilience',
          'Human activities can disrupt this delicate balance',
        ],
        conclusion: 'Protecting ecosystems is essential for maintaining the balance that supports all life.',
      },
      hi: {
        heading: 'पारिस्थितिकी तंत्र संतुलन बनाए रखना',
        intro: 'पारिस्थितिकी तंत्र पौधों, जानवरों और उनके पर्यावरण के बीच जटिल अंतःक्रियाओं के माध्यम से संतुलन बनाए रखते हैं।',
        points: [
          'पौधे जानवरों के लिए ऑक्सीजन और भोजन का उत्पादन करते हैं',
          'जानवर पौधों के लिए CO₂ और पोषक तत्व प्रदान करते हैं',
          'अपघटक पोषक तत्वों को वापस मिट्टी में रीसायकल करते हैं',
          'जैव विविधता पारिस्थितिकी तंत्र की लचीलापन सुनिश्चित करती है',
          'मानव गतिविधियां इस नाजुक संतुलन को बाधित कर सकती हैं',
        ],
        conclusion: 'पारिस्थितिकी तंत्र की रक्षा करना उस संतुलन को बनाए रखने के लिए आवश्यक है जो सभी जीवन का समर्थन करता है।',
      },
    },
  },
  'climate-plants': {
    title: 'Climate & Plants',
    icon: '🌡️',
    color: 'from-orange-500 to-red-500',
    content: {
      en: {
        heading: 'Climate Impact on Plants',
        intro: 'Temperature and climate conditions significantly affect plant growth, photosynthesis rates, and ecosystem health.',
        points: [
          'Optimal temperature ranges vary by plant species',
          'Extreme heat can reduce photosynthesis efficiency',
          'Cold temperatures slow down plant metabolism',
          'Climate change affects growing seasons and plant distribution',
          'Plants can help mitigate climate change by absorbing CO₂',
        ],
        conclusion: 'Understanding climate-plant interactions is crucial for agriculture and ecosystem management.',
      },
      hi: {
        heading: 'पौधों पर जलवायु प्रभाव',
        intro: 'तापमान और जलवायु स्थितियां पौधे के विकास, प्रकाश संश्लेषण दर और पारिस्थितिकी तंत्र के स्वास्थ्य को महत्वपूर्ण रूप से प्रभावित करती हैं।',
        points: [
          'इष्टतम तापमान सीमा पौधे की प्रजातियों के अनुसार भिन्न होती है',
          'अत्यधिक गर्मी प्रकाश संश्लेषण दक्षता को कम कर सकती है',
          'ठंडा तापमान पौधे के चयापचय को धीमा कर देता है',
          'जलवायु परिवर्तन बढ़ते मौसम और पौधे के वितरण को प्रभावित करता है',
          'पौधे CO₂ को अवशोषित करके जलवायु परिवर्तन को कम करने में मदद कर सकते हैं',
        ],
        conclusion: 'जलवायु-पौधे की अंतःक्रियाओं को समझना कृषि और पारिस्थितिकी तंत्र प्रबंधन के लिए महत्वपूर्ण है।',
      },
    },
  },
  'urban-greenery': {
    title: 'Urban Greenery & Air Quality',
    icon: '🏙️',
    color: 'from-teal-500 to-cyan-500',
    content: {
      en: {
        heading: 'Urban Greenery Benefits',
        intro: 'Plants in urban areas play a crucial role in improving air quality, reducing pollution, and enhancing city livability.',
        points: [
          'Trees filter pollutants and particulate matter from the air',
          'Urban forests reduce the urban heat island effect',
          'Plants absorb CO₂ and produce oxygen in cities',
          'Green spaces improve mental health and well-being',
          'Strategic planting can significantly improve air quality',
        ],
        conclusion: 'Investing in urban greenery is essential for creating healthier, more sustainable cities.',
      },
      hi: {
        heading: 'शहरी हरियाली के लाभ',
        intro: 'शहरी क्षेत्रों में पौधे हवा की गुणवत्ता में सुधार, प्रदूषण को कम करने और शहर की रहने योग्यता बढ़ाने में महत्वपूर्ण भूमिका निभाते हैं।',
        points: [
          'पेड़ हवा से प्रदूषकों और कण पदार्थ को फ़िल्टर करते हैं',
          'शहरी जंगल शहरी गर्मी द्वीप प्रभाव को कम करते हैं',
          'पौधे शहरों में CO₂ को अवशोषित करते हैं और ऑक्सीजन का उत्पादन करते हैं',
          'हरे स्थान मानसिक स्वास्थ्य और कल्याण में सुधार करते हैं',
          'रणनीतिक रोपण हवा की गुणवत्ता में काफी सुधार कर सकता है',
        ],
        conclusion: 'शहरी हरियाली में निवेश करना स्वस्थ, अधिक टिकाऊ शहर बनाने के लिए आवश्यक है।',
      },
    },
  },
}

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState('en')
  const articleId = params.articleId
  const article = articles[articleId]

  useEffect(() => {
    const saved = localStorage.getItem('language')
    if (saved) setLanguage(saved)
  }, [])

  if (!article) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <button onClick={() => router.push('/learn')} className="text-emerald-600 hover:underline">
              ← Back to Learning Hub
            </button>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  const content = article.content[language] || article.content.en

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-emerald-900">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => router.push('/learn')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
          >
            ← Back to Learning Hub
          </motion.button>

          {/* Article Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 md:p-12 border-2 border-emerald-500/20 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`text-6xl p-4 rounded-2xl bg-gradient-to-br ${article.color} opacity-20`}>
                {article.icon}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                {article.title}
              </h1>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {content.heading}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.intro}
              </p>

              {/* Key Points */}
              <div className="space-y-4">
                {content.points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 glass rounded-xl border border-emerald-500/20"
                  >
                    <span className="text-2xl">✨</span>
                    <p className="text-gray-700 dark:text-gray-300 flex-1">{point}</p>
                  </motion.div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/30">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {content.conclusion}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

