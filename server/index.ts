import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import OpenAI from 'openai';

const app = express();

const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'mobile-ai-backend',
  });
});

/**
 * Normal AI request.
 *
 * Returns the complete response once generation finishes.
 */
app.post('/ai/chat', async (req, res) => {
  try {
    const {prompt} = req.body;

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({
        error: 'Prompt is required.',
      });
    }

    const response = await openai.responses.create({
      model: 'gpt-5.6',
      input: prompt.trim(),
    });

    return res.json({
      response: response.output_text,
    });
  } catch (error) {
    console.error('AI request failed:', error);

    return res.status(500).json({
      error: 'Failed to generate AI response.',
    });
  }
});

/**
 * Streaming AI request.
 *
 * Sends pieces of the generated response to the client
 * as they become available.
 */
app.post('/ai/chat/stream', async (req, res) => {
  try {
    const {prompt} = req.body;

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({
        error: 'Prompt is required.',
      });
    }

    res.status(200);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Transfer-Encoding', 'chunked');

    const stream = await openai.responses.create({
      model: 'gpt-5.6',
      input: prompt.trim(),
      stream: true,
    });

    for await (const event of stream) {
      if (event.type === 'response.output_text.delta') {
        res.write(event.delta);
      }
    }

    res.end();
  } catch (error) {
    console.error('AI streaming request failed:', error);

    if (!res.headersSent) {
      return res.status(500).json({
        error: 'Failed to stream AI response.',
      });
    }

    res.end();
  }
});

app.listen(port, () => {
  console.log(
    `🤖 Mobile AI backend running on http://localhost:${port}`,
  );
});
