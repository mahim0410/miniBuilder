import "dotenv/config";
import { OpenRouter } from '@openrouter/agent';
const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});
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
//# sourceMappingURL=index.js.map