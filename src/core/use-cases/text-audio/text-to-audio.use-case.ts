import { http } from '../../../adapters';

interface Payload {
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async ({ prompt, voice }: Payload) => {
  try {
    const res = await http.postBlob(
      `${import.meta.env.VITE_GPT_API}/text-to-audio`,
      {
        prompt,
        voice,
      }
    );

    if (!res.ok) throw new Error('Could not generate audio');

    const audioFile = await res.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      audioUrl,
      message: prompt,
    };
  } catch (error) {
    console.error({ error });
    return {
      ok: false,
      message: `Could not generate audio`,
    };
  }
};
