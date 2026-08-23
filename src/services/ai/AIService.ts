export interface AIResponse {
  response: string;
}

const API_BASE_URL = 'http://localhost:3000';

export async function askAI(prompt: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `AI request failed (${response.status}): ${errorBody}`,
    );
  }

  const data: AIResponse = await response.json();

  return data.response;
}

export function streamAI(
  prompt: string,
  onChunk: (chunk: string) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    let lastResponseLength = 0;

    xhr.open('POST', `${API_BASE_URL}/ai/chat/stream`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onprogress = () => {
      const currentResponse = xhr.responseText;

      const newText = currentResponse.slice(lastResponseLength);

      if (newText) {
        lastResponseLength = currentResponse.length;
        onChunk(newText);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const currentResponse = xhr.responseText;

        const remainingText = currentResponse.slice(lastResponseLength);

        if (remainingText) {
          onChunk(remainingText);
        }

        resolve();
        return;
      }

      reject(
        new Error(
          `AI streaming request failed (${xhr.status}): ${xhr.responseText}`,
        ),
      );
    };

    xhr.onerror = () => {
      reject(new Error('Network error while streaming AI response.'));
    };

    xhr.ontimeout = () => {
      reject(new Error('AI streaming request timed out.'));
    };

    xhr.send(
      JSON.stringify({
        prompt,
      }),
    );
  });
}
