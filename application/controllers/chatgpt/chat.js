const OpenAI = require("openai");
const dotenv = require('dotenv')
dotenv.config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
async function chatWithGPT(userPrompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant'
                },
                {
                    role: 'user',
                    content: userPrompt
                }
            ],
            store: true
        })
        return completion.choices[0].message;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports  = chatWithGPT