import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { getAllPromptsRoute } from './routes/get-all-prompts';
import { uploadVideoRoute } from './routes/upload-video';
import { createTranscriptionRoute } from './routes/createTranscription';
import { generateAICompletionRoute } from './routes/generate-ai-completion';

const app = fastify();

app.register(fastifyCors, {
    origin: '*',
})
app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAICompletionRoute)

app.listen({
    port: 3000
}).then(() => {
    console.log("running at http://localhost:3000")
})