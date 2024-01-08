import { http } from '../../adapters';

export const orthographyUseCase = async (prompt: string) => {
  try {
    const res = await http.post('/orthography-check', { prompt });

    console.log({ res });
  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'Could not realize orthography correction',
    };
  }
};
