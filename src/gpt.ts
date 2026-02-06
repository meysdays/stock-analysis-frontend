import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
console.log(apiKey);
const client = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

export async function queryGpt(prompt: string) {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { 'role': 'system', 'content': 'You are a financial consultant/analyst. Your job is to answer user questions based on the stock data available in the frontend state. The data includes: daily prices, moving averages (MA5, MA20), volume, and signals like Strong Buy, Buy, Sell, or Strong Sell. Answer clearly and concisely. If the user asks a question you cannot answer from the provided data, politely state that you do not have enough information.' },
                { 'role': 'user', 'content': prompt }
            ]
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error calling GPT:", error);
        throw error;
    }
}
