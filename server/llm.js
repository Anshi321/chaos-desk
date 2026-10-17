const TIMEOUT = 9000;

export function llmConfigured() {
  const e = process.env;
  return Boolean(e.ANTHROPIC_API_KEY || e.OPENAI_API_KEY || e.GEMINI_API_KEY);
}

// Returns plain text from whichever provider has a key set.
export async function askLLM(system, user) {
  const e = process.env;

  if (e.ANTHROPIC_API_KEY) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: AbortSignal.timeout(TIMEOUT),
      headers: {
        'content-type': 'application/json',
        'x-api-key': e.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: e.LLM_MODEL || 'claude-haiku-5-5',
        max_tokens: 500,
        system,
        messages: [{ role: 'user', content: user }],
      }),
    });
    if (!res.ok) throw new Error(`anthropic ${res.status}`);
    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  if (e.OPENAI_API_KEY) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: AbortSignal.timeout(TIMEOUT),
      headers: { 'content-type': 'application/json', authorization: `Bearer ${e.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: e.LLM_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });
    if (!res.ok) throw new Error(`openai ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  }

  if (e.GEMINI_API_KEY) {
    const model = e.LLM_MODEL || 'gemini-2.0-flash';
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${e.GEMINI_API_KEY}`,
      {
        method: 'POST',
        signal: AbortSignal.timeout(TIMEOUT),
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: user }] }],
        }),
      }
    );
    if (!res.ok) throw new Error(`gemini ${res.status}`);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  throw new Error('no_llm_key');
}

export function extractJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error('no_json');
  return JSON.parse(text.slice(start, end + 1));
}
