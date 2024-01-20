/* eslint-disable no-constant-condition */

import { http } from '../../adapters';

export const proStreamConsUseCase = async (
  prompt: string,
  abortSignal: AbortSignal
) => {
  try {
    const res = await http.postStream(
      'pros-cons-discusser-stream',
      { prompt },
      abortSignal
    );

    if (!res.ok) throw new Error('Could not realize comparative');

    const reader = res.body?.getReader();

    if (!reader) {
      console.log('Could not generate reader');
      return null;
    }

    return reader;

    // const decoder = new TextDecoder();

    // let text = '';

    // while (true) {
    //   const { value, done } = await reader.read();
    //   if (done) break;

    //   const decodedChunk = decoder.decode(value, { stream: true });
    //   text += decodedChunk;
    //   console.log(text);
    // }
  } catch (error) {
    console.error({ error });
    return null;
  }
};
