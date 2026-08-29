import express from 'express';

const router = express.Router();

// POST /api/assistant/chat
router.post('/chat', async (req, res) => {
  const { message, language = 'en', userProfile } = req.body;
  const q = (message || '').toLowerCase();
  const userName = userProfile?.name || 'Priya Sharma';

  let reply = '';
  if (q.includes('what skills') || q.includes('next')) {
    if (language === 'hi') {
      reply = `नमस्ते ${userName}! आपके प्रोफ़ाइल के अनुसार आपकी मुख्य प्राथमिकताएं हैं:\n1. **AI & Machine Learning** (40% गैप)\n2. **Cloud Computing** (40% गैप)\n3. **GIS Spatial Analytics** (28% गैप)।`;
    } else if (language === 'te') {
      reply = `నమస్కారం ${userName}! మీ ప్రొఫైల్ ప్రకారం తదుపరి నైపుణ్యాలు:\n1. **AI & Machine Learning** (40% లోపం)\n2. **Cloud Computing** (40% లోపం).`;
    } else {
      reply = `Hello ${userName}! Based on your current profile as **Statistical Officer (NSS)**, your top learning priorities are:\n\n1. 🌟 **AI & Machine Learning** (Critical 40% Gap — Current: 35% vs Target: 75%)\n2. 🌐 **Cloud Computing (MeghRaj)** (Critical 40% Gap — Current: 30% vs Target: 70%)\n3. 🗺️ **GIS & Spatial Analytics** (High 28% Gap — Current: 42% vs Target: 70%)\n\nWe recommend starting Step 1 of your **Personalized Learning Path**: *"Advanced Python for Official Statistics"* on iGOT Karmayogi.`;
    }
  } else if (q.includes('python')) {
    reply = `Python is recommended because your current competency is **55%** against the **80%** required benchmark for Statistical Officers. Mastering automated tabulation reduces manual survey processing time by up to 40%.`;
  } else if (q.includes('sampling')) {
    reply = `Stratified Random Sampling divides the heterogeneous population into mutually exclusive homogeneous strata to minimize within-stratum variance and ensure adequate representation for key administrative groups. Your sampling score is strong at **82%**!`;
  } else {
    reply = `Hello ${userName}! I have analyzed your MoSPI competency matrix. You have strong foundations in **Sampling (82%)** and **Data Quality (80%)**. Your largest development opportunities are **AI/ML (35%)** and **Cloud Infrastructure (30%)**. How can I assist your capacity building today?`;
  }

  res.json({ reply, timestamp: new Date().toLocaleTimeString() });
});

export default router;
