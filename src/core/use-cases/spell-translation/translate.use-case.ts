/* eslint-disable no-constant-condition */

import { http } from '../../../adapters';

interface Payload {
  prompt: string;
  lang: string;
}

export async function* translateStreamGeneratorUseCase(
  payload: Payload,
  abortSignal: AbortSignal
) {
  const { prompt, lang } = payload;

  try {
    const res = await http.postStream(
      `${import.meta.env.VITE_GPT_API}/translate`,
      { prompt, lang },
      abortSignal
    );

    if (!res.ok) throw new Error('Could not translate, try again later');

    const reader = res.body?.getReader();

    if (!reader) {
      throw new Error('Could not create reader');
    }

    const decoder = new TextDecoder();

    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield {
        ok: true,
        message: text,
      };
    }
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: error,
    };
  }
}
