import { http } from '../../../adapters';
import { OrthographyResponse } from '../../../interfaces';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const data = await http.post<OrthographyResponse>('/orthography-check', {
      prompt,
    });

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error({ error });
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: `Could not realize spell correction`,
    };
  }
};
