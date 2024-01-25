import { http } from '../../../adapters';
import { ProConsResponse } from '../../../interfaces';

export const proConsUseCase = async (prompt: string) => {
  try {
    const data = await http.post<ProConsResponse>(
      `${import.meta.env.VITE_GPT_API}/pro-cons-discusser`,
      {
        prompt,
      }
    );

    return {
      ok: true,
      message: data.message.content,
    };
  } catch (error) {
    console.error({ error });
    return {
      ok: false,
      message: `Could not realize comparative`,
    };
  }
};
