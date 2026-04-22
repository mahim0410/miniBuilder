import 'dotenv/config';
const key = process.env.OPEN_ROUTER_KEY;
import OpenAI from 'openai';
const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPEN_ROUTER_KEY,
});
// First API call with reasoning
async function main() {
    const apiResponse = await client.chat.completions.create({
        model: 'arcee-ai/trinity-large-preview:free',
        messages: [
            {
                role: 'user',
                content: "how are you",
            },
        ],
        // reasoning { enabled: true }
    });
    const response = apiResponse.choices[0]?.message.content;
    console.log(`The user response is -`, response);
    // Preserve the assistant message with reasoning_details
    // const messages = [
    //     {
    //         role: 'user' as const,
    //         content: "How many r's are in the word 'strawberry'?",
    //     },
    //     {
    //         role: 'assistant' as const,
    //         content: response.content,
    //         reasoning_details: response.reasoning_details, // Pass back unmodified
    //     },
    //     {
    //         role: 'user' as const,
    //         content: "Are you sure? Think carefully.",
    //     },
    // ];
    // // Second API call - model continues reasoning from where it left off
    // const response2 = await client.chat.completions.create({
    //     model: 'minimax/minimax-m2.5:free',
    //     messages, // Includes preserved reasoning_details
    // });
}
main();
//# sourceMappingURL=index.js.map