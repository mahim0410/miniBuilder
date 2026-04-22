import 'dotenv/config';
// const key: string | undefined = process.env.OPEN_ROUTER_KEY
// import OpenAI from 'openai';
// const client = new OpenAI({
//     baseURL: 'https://openrouter.ai/api/v1',
//     apiKey: process.env.OPEN_ROUTER_KEY,
// });
// // First API call with reasoning
// async function main() {
//     const apiResponse = await client.chat.completions.create({
//         model: 'arcee-ai/trinity-large-preview:free',
//         messages: [
//             {
//                 role: 'user' as const,
//                 content: "whats the meaning of life",
//             },
//         ],
//         // reasoning { enabled: true }
//     });
//     // console.log(apiResponse)
//     // Extract the assistant message with reasoning_details
//     type ORChatMessage = (typeof apiResponse)['choices'][number]['message']['content'] & {
//         reasoning_details?: unknown;
//     };
//     const response = apiResponse.choices[0]?.message.content as ORChatMessage;
//     console.log(`The user response is -`, response)
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
// }
// main()
// import { OpenRouter } from "@openrouter/sdk";
// const openrouter = new OpenRouter({
//     apiKey: process.env.OPEN_ROUTER_KEY,
// });
// // Stream the response to get reasoning tokens in usage
// const stream = await openrouter.chat.send({
//     chatRequest: {
//         model: "google/gemma-3-12b-it:free",
//         messages: [
//             {
//                 role: "user",
//                 content: "How many r's are in the word 'strawberry'?"
//             }
//         ],
//         stream: true
//     }
// });
// let response = "";
// for await (const chunk of stream) {
//     const content = chunk.choices[0]?.delta?.content;
//     if (content) {
//         response += content;
//         process.stdout.write(content);
//     }
//     // Usage information comes in the final chunk
//     //   if (chunk.usage) {
//     //     console.log("\nReasoning tokens:", chunk.usage.reasoningTokens);
//     //   }
// }
// import { OpenRouter } from '@openrouter/sdk';
// const openRouter = new OpenRouter({
//     apiKey: process.env.OPEN_ROUTER_KEY,
// });
// async function main() {
//     const completion = await openRouter.chat.send({
//         chatRequest: {                          // ← wrap here
//             model: 'google/gemma-3-12b-it:free',
//             messages: [
//                 {
//                     role: 'user',
//                     content: 'What is the meaning of life?',
//                 },
//             ],
//             stream: true,
//         }
//     });
//     console.log(completion);
// }
// main()
// import { OpenRouter } from '@openrouter/sdk';
// console.log(process.env.OPEN_ROUTER_KEY)
// const client = new OpenRouter({
//     apiKey: process.env.OPEN_ROUTER_KEY,
// });
// const result = openrouter.callModel({
//     model: 'google/gemma-4-26b-a4b-it:free',
//     input: 'What is the capital of France?',
// });
// // Get text (simplest pattern)
// const text = await result.getText();
// console.log(text); // "The capital of France is Paris."
// const response = await client.chat.send({
//     model: "minimax/minimax-m2",
//     messages: [
//         { role: "user", content: "Hello" }
//         // ← Your IDE validates message structure
//     ],
//     temperature: 0.7, // ← Type-checked
//     stream: true      // ← Response type changes based on this
// });
// import { OpenRouter } from '@openrouter/sdk';
// const client = new OpenRouter({
//     apiKey: process.env.OPEN_ROUTER_KEY
// });
// const response = await client.chat.send({
//     chatRequest: {                          // ← wrap here
//         model: 'z-ai/glm-4.5-air:free',
//         messages: [
//             {
//                 role: 'user',
//                 content: 'What is the meaning of life?',
//             },
//         ],
//         // stream: true,
//     }
// });
// const answer = response.choices[0]?.message
// for await (const delta of response.getTextStream()) {
//     process.stdout.write(delta);
// }
// console.log(answer);
import { OpenRouter } from '@openrouter/agent';
const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});
// const result = openrouter.callModel({
//     model: 'z-ai/glm-4.5-air:free',
//     input: 'Write a short poem about the ocean.',
// });
// for await (const delta of result.getTextStream()) {
//     process.stdout.write(delta);
// }
const result = openrouter.callModel({
    model: 'minimax/minimax-m2.5:free',
    input: 'What is the meaning of life',
    //   tools: [searchTool], // Generator tool with eventSchema
});
for await (const event of result.getFullResponsesStream()) {
    switch (event.type) {
        case 'response.output_text.delta':
            process.stdout.write(event.delta);
            break;
        case 'response.function_call_arguments.delta':
            console.log('Tool argument delta:', event.delta);
            break;
        case 'response.completed':
            console.log('Response complete');
            break;
        case 'tool.preliminary_result':
            // Intermediate progress from generator tools
            console.log('Progress:', event.result);
            break;
        case 'tool.result':
            // Final result when tool execution completes
            console.log('Tool completed:', event.toolCallId);
            console.log('Result:', event.result);
            // Access any preliminary results that were emitted
            if (event.preliminaryResults) {
                console.log('Preliminary results:', event.preliminaryResults);
            }
            break;
    }
}
//# sourceMappingURL=index2.js.map