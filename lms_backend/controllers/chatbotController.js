const { Course } = require('../models/associations');

exports.chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        success: true,
        reply: "Hello! I am your AI Career Advisor. It looks like the Gemini API Key is not yet configured in the server's environment. Admin: Please add `GEMINI_API_KEY` to your backend `.env` file to enable full AI responses.\n\nHere are some of our courses available for you to browse directly in our Catalog page!",
        recommendedCourseIds: []
      });
    }

    // Fetch courses from DB to give real-time context
    const dbCourses = await Course.findAll({
      attributes: ['id', 'title', 'description', 'category', 'duration', 'course_type']
    });

    const coursesContext = dbCourses.map(c => 
      `- [ID: ${c.id}] ${c.title} (${c.category}, Level: ${c.course_type === 'mega' ? 'Intermediate/Advanced' : 'Beginner'}, Duration: ${c.duration} hrs): ${c.description}`
    ).join('\n');

    // System prompt instructing the AI
    const systemPrompt = `You are a helpful AI Career and Course Advisor for our LMS platform. Your task is to recommend suitable courses from our platform based on a student's graduation background (e.g. B.Tech, MCA, BCA, Commerce, Arts) and their career interests.

Here is the list of courses currently available in our system:
${coursesContext}

Rules:
1. Welcome the student and politely ask for their graduation background, fields of study, and career goals/interests if they haven't provided them.
2. Based on their input, analyze which of the courses above best match their goals.
3. Keep the response friendly, encouraging, and explain why the recommended courses are beneficial.
4. If you recommend any courses, append a JSON block at the very end of your response on a new line (do not include it in markdown blocks) in this exact format:
:::RECOMMENDED_COURSES:::
{"recommendedCourseIds": [1, 2]}
Replace the list with the actual numeric IDs of the courses you recommend. Only recommend courses from the list provided above.
5. If no courses are relevant, do not output the recommendation JSON block. Do not mention course IDs in your natural text response; refer to them by their titles instead.`;

    // Format chat contents for Gemini API API
    // Transform incoming history to match Gemini format
    const contents = [];
    history.forEach(msg => {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });

    // Append the new user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // We call Gemini API via native fetch
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Gemini API Error details:', data);
      throw new Error(data.error?.message || 'Failed to generate response from Gemini API');
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that response.";

    // Parse recommendation block
    let cleanedReply = replyText;
    let recommendedCourseIds = [];
    const delimiter = ':::RECOMMENDED_COURSES:::';
    if (replyText.includes(delimiter)) {
      const parts = replyText.split(delimiter);
      cleanedReply = parts[0].trim();
      const jsonStr = parts[1]?.trim();
      if (jsonStr) {
        try {
          const cleanJsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJsonStr);
          if (parsed && Array.isArray(parsed.recommendedCourseIds)) {
            recommendedCourseIds = parsed.recommendedCourseIds.map(Number);
          }
        } catch (e) {
          console.error("Failed to parse recommended course IDs:", e);
        }
      }
    }

    res.json({
      success: true,
      reply: cleanedReply,
      recommendedCourseIds
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete chat interaction',
      error: error.message
    });
  }
};
