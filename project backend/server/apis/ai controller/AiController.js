const Groq = require("groq-sdk");

const GROQ_API_KEY = "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";
const groq = new Groq({ apiKey: GROQ_API_KEY });

const main = async (req, res) => {
  if (!req.body.prompt) {
    return res.send({
      message: "prompt is required",
      status: 403,
      success: false,
    });
  }

  try {
    let userPrompt = req.body.prompt;
    if (typeof userPrompt === "object") {
      userPrompt = JSON.stringify(userPrompt);
    }
    let prompt = `${userPrompt} explain in 20-30 words as an investment suggestion/summary`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional investment and startup idea advisor.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";
    console.log("Groq AI Response:", reply);

    res.send({
      message: reply,
      status: 200,
      success: true,
    });
  } catch (err) {
    console.error("Groq AI Error:", err);
    res.send({
      message: err.message || "Failed to generate AI suggestion",
      status: 500,
      success: false,
    });
  }
};

module.exports = {
  main,
};
