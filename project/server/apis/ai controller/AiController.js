// import {GoogleGenAI} from '@google/genai';
const { GoogleGenAI } = require("@google/genai");
const GEMINI_API_KEY = "AIzaSyBG_qeGuSRg8KfxvNIeE3cu6K71ITT9ssI";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const main = async (req, res) => {
  if (!req.body.prompt) {
    res.send({
      message: "prompt is required",
      status: 403,
      success: false,
    });
  } else {
    try {
         let prompt=req.body.prompt +"explain in 20 words"

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      console.log(response.text);

      res.send({
        message: response.text,
        status: 200,
        success: true,
      });
    } catch (err) {
      console.log(err);
      
      res.send({
        message: err,
        status: 500,
        success: false,
      });
    }
  }
};

module.exports = {
  main,
};
