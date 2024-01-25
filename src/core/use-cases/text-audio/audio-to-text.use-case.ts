import { http } from '../../../adapters';
import { AudioToTextResponse } from '../../../interfaces';

interface Payload {
  prompt?: string;
  file: File;
}

interface Response {
  ok: boolean;
  data?: AudioToTextResponse;
  text?: string;
}

export const audioToTextUseCase = async ({
  prompt,
  file,
}: Payload): Promise<Response> => {
  const formData = new FormData();
  formData.append('file', file);
  if (prompt) formData.append('prompt', prompt);

  try {
    const res = await http.post<AudioToTextResponse>('audio-to-text', formData);

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      text: 'Could not transcribe audio',
    };
  }
};
