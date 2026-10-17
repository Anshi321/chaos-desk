let current = null;

export function stopVoice() {
  if (current) {
    current.pause();
    current = null;
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function browserVoice(text) {
  if (!('speechSynthesis' in window)) return 'none';
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.05;
  u.pitch = 1.1;
  window.speechSynthesis.speak(u);
  return 'browser';
}

// Returns 'elevenlabs' | 'browser' | 'none'
export async function speak(text) {
  stopVoice();
  try {
    const res = await fetch('/api/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error('voice unavailable');
    const url = URL.createObjectURL(await res.blob());
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    current = audio;
    await audio.play();
    return 'elevenlabs';
  } catch {
    return browserVoice(text);
  }
}
