# Experiment 14 — Mobile AI / LLM Integration

## Status

✅ Completed

## Objective

Build a real Mobile AI integration in React Native.

The experiment demonstrates how a React Native application can send a user prompt to a backend AI service, communicate with an LLM using the OpenAI Responses API, and display the generated response progressively using streaming.

## What We Built

We built a React Native Mobile AI feature that sends a user prompt to a backend service and receives a response from an LLM.

The implementation contains:

- React Native Mobile AI UI
- TypeScript AI service
- Express backend
- OpenAI Responses API integration
- Environment-based API key configuration
- Normal LLM response endpoint
- Streaming LLM response endpoint
- Progressive response rendering
- Error handling
- Scrollable AI response UI

## Architecture

The Mobile AI request flows through the following layers:

```text
React Native
      ↓
AIService.ts
      ↓
HTTP POST
      ↓
Express Backend
      ↓
OpenAI Responses API
      ↓
LLM
      ↓
AI Response
      ↓
React Native UI
```

The React Native application does not communicate directly with the OpenAI API.

Instead, the mobile application sends the prompt to the Express backend. The backend communicates with the LLM and returns the generated response to the mobile application.

This architecture keeps the OpenAI API key on the backend rather than inside the mobile application.

## 1. Backend Setup

A separate Node.js backend was created inside the project:

```text
server/
├── index.ts
├── package.json
├── .env
└── .gitignore
```

The backend uses:

- Express
- OpenAI SDK
- dotenv
- CORS
- TypeScript
- tsx

The backend is intentionally separated from the React Native application.

The backend is responsible for communicating with the OpenAI API so that the private API key is never embedded inside the mobile application.

## 2. API Key Security

The OpenAI API key is stored in the backend environment file:

```text
server/.env
```

The `.env` file is excluded from Git through the backend `.gitignore` file.

The React Native application does not contain the OpenAI API key.

This protects the secret from being exposed inside the mobile application bundle. The mobile application communicates with the backend, and the backend is responsible for authenticating with the OpenAI API.

The verified architecture is:

```text
React Native App
      ↓
Backend API
      ↓
OpenAI API
```

The API key therefore remains a server-side secret.

## 3. Normal LLM Endpoint

The backend exposes a normal AI endpoint:

```text
POST /ai/chat
```

The React Native application sends a prompt as JSON:

```json
{
  "prompt": "Explain React Native Fabric in one simple sentence."
}
```

The backend validates the prompt and sends it to the OpenAI Responses API:

```ts
const response = await openai.responses.create({
  model: "gpt-5.6",
  input: prompt.trim(),
});
```

The generated text is returned to React Native as JSON:

```json
{
  "response": "..."
}
```

This endpoint was successfully tested using `curl`, confirming that the backend could communicate with the OpenAI API and return a generated response.

## 4. Streaming LLM Endpoint

The backend exposes a streaming AI endpoint:

```text
POST /ai/chat/stream
```

The OpenAI Responses API is called with streaming enabled:

```ts
const stream = await openai.responses.create({
  model: "gpt-5.6",
  input: prompt.trim(),
  stream: true,
});
```

The backend receives incremental output events from the LLM:

```ts
for await (const event of stream) {
  if (event.type === "response.output_text.delta") {
    res.write(event.delta);
  }
}

res.end();
```

Instead of waiting for the complete response, the backend forwards each generated text segment to the React Native application as it becomes available.

The endpoint was independently verified using `curl -N`, confirming that the response could be received progressively from the backend.

## 5. React Native Streaming Client

The React Native application uses `XMLHttpRequest` to receive the streaming response incrementally.

The streaming service is defined as:

```ts
export function streamAI(
  prompt: string,
  onChunk: (chunk: string) => void,
): Promise<void>
```

The request is sent to:

```text
http://localhost:3000/ai/chat/stream
```

The client listens for incremental response data using `onprogress`:

```ts
xhr.onprogress = () => {
  const currentResponse = xhr.responseText;

  const newText = currentResponse.slice(lastResponseLength);

  if (newText) {
    lastResponseLength = currentResponse.length;
    onChunk(newText);
  }
};
```

The client keeps track of the amount of response data that has already been processed and sends only the newly received text to the React Native component.

The initial implementation attempted to use `response.body.getReader()`. In the React Native runtime used for this experiment, `response.body` was not available for the streaming response, resulting in:

```text
Streaming is not supported by this response.
```

The implementation was changed to `XMLHttpRequest` with incremental `onprogress` handling, after which streaming worked successfully in the simulator.

## 6. Progressive React Rendering

The React Native component updates the AI response whenever a new chunk arrives from the streaming service.

The streaming request is handled using:

```ts
await streamAI(trimmedPrompt, chunk => {
  setResponse(current => current + chunk);
});
```

Instead of waiting for the complete LLM response, the UI is updated incrementally:

```text
User Prompt
     ↓
AI Generation Starts
     ↓
Chunk 1 → React State → UI Update
     ↓
Chunk 2 → React State → UI Update
     ↓
Chunk 3 → React State → UI Update
     ↓
Chunk 4 → React State → UI Update
     ↓
Generation Complete
```

This produces a ChatGPT-style experience where the generated response becomes visible while the model is still generating it.

The simulator was successfully verified to display the response progressively, one chunk at a time.

## 7. Runtime Verification

The Mobile AI feature was successfully tested in the React Native simulator.

The complete request flow was verified:

```text
React Native UI
      ↓
AIService.ts
      ↓
POST /ai/chat/stream
      ↓
Express Backend
      ↓
OpenAI Responses API
      ↓
Streaming AI Output
      ↓
XMLHttpRequest onprogress
      ↓
React State Updates
      ↓
Progressive UI Rendering
```

The following behaviors were successfully verified:

1. The user can enter an AI prompt.
2. The React Native application sends the prompt to the backend.
3. The backend communicates with the OpenAI Responses API.
4. The backend streams generated text to the mobile application.
5. React Native receives the response incrementally.
6. The response is appended to React state as chunks arrive.
7. The simulator displays the generated response progressively.
8. Long responses can be displayed using the scrollable response area.

The final simulator test confirmed that the AI response appears progressively instead of waiting for the complete response.

## 8. Key Learnings

This experiment demonstrated the fundamental architecture required to integrate an LLM into a React Native application.

The important concepts demonstrated were:

- LLM API integration
- OpenAI Responses API
- Backend AI architecture
- API key security
- Express backend development
- HTTP streaming
- React Native networking
- XMLHttpRequest incremental responses
- Progressive React state updates
- Progressive UI rendering
- Error handling
- Separation of mobile and backend responsibilities

The experiment also demonstrated an important production architecture principle: private AI credentials should remain on the backend and should not be embedded inside the mobile application.

Another important learning was that streaming support depends on the networking capabilities available in the client runtime. In this experiment, `XMLHttpRequest` with `onprogress` provided the required incremental response handling in React Native.

## 9. Result

✅ Experiment 14 — Mobile AI / LLM Integration completed successfully.

The React Native application successfully communicates with an LLM through a dedicated backend service and displays generated responses progressively through streaming.

The complete verified flow is:

```text
React Native UI
      ↓
AIService.ts
      ↓
Express Backend
      ↓
OpenAI Responses API
      ↓
LLM
      ↓
Streaming Output
      ↓
HTTP Response
      ↓
XMLHttpRequest
      ↓
React State
      ↓
Progressive UI
```

The experiment successfully established the foundation for more advanced Mobile AI capabilities including structured AI responses, tool calling, RAG, voice AI, and agentic workflows.

## 10. Running the AI Backend

The Mobile AI experiment requires the Express backend to be running locally before the React Native application can send AI requests.

### Install backend dependencies

From the project root:

```bash
cd server
npm install
```

### Configure the OpenAI API key

Create the backend environment file:

```text
server/.env
```

Add the OpenAI API key:

```text
OPENAI_API_KEY=your_api_key_here
```

The `.env` file is excluded from Git through `server/.gitignore`.

### Start the backend

From the `server` directory:

```bash
npm run dev
```

The backend starts on:

```text
http://localhost:3000
```

The health endpoint can be checked using:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "mobile-ai-backend"
}
```

The React Native application must be running separately through Metro.

The complete local development setup is:

```text
Terminal 1

cd server
npm run dev

        ↓

Express Backend
http://localhost:3000

        ↑

React Native Application

Terminal 2

npm start
```

The backend must remain running while testing the Mobile AI experiment in the simulator.

## 11. Markdown Response Rendering

LLM responses commonly contain Markdown formatting such as headings, bold text, lists, and other structured content.

The React Native application uses `react-native-marked` to parse the generated Markdown before displaying it in the UI.

This prevents raw Markdown syntax such as `###` and `**text**` from appearing directly in the application.

The response is rendered progressively while the streamed content is being received.

## 12. Streaming UI Optimization

The OpenAI Responses API produces incremental output events, which are forwarded by the Express backend to the React Native application.

The React Native client receives these pieces through `XMLHttpRequest` and its `onprogress` callback.

Individual network chunks can be very small. Updating React state for every individual chunk can cause unnecessary rendering work.

The implementation therefore temporarily buffers incoming chunks and updates React state approximately every 80 milliseconds.

The resulting flow is:

```text
OpenAI Streaming Output
        ↓
Express Backend
        ↓
HTTP Streaming Response
        ↓
XMLHttpRequest onprogress
        ↓
Client Buffer
        ↓
Periodic React State Update
        ↓
Markdown Rendering
        ↓
Progressive UI
```

This preserves the streaming experience while reducing unnecessary React renders.

## 13. Final Result

Experiment 14 now demonstrates a complete Mobile AI request pipeline including:

- Secure server-side API key handling
- Express backend integration
- OpenAI Responses API
- Normal LLM requests
- Streaming LLM requests
- React Native incremental response handling
- Buffered streaming UI updates
- Markdown response rendering
- Progressive AI response presentation
- Error handling
