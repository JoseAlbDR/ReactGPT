import { http } from '../../../adapters';

export const createThreadUseCase = async () => {
  try {
    const resp = await http.post(
      `${import.meta.env.VITE_ASSISTANT_API}/create-thread`
    );

    const { id } = resp as { id: string };

    return id;
  } catch (error) {
    throw new Error('Error creating thread');
  }
};
