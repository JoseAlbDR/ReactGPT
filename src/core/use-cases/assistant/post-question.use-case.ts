import { http } from '../../../adapters';
import { AssistantResponse } from '../../../interfaces';

interface Options {
  threadId: string;
  question: string;
}

export const postQuestionUseCase = async ({ threadId, question }: Options) => {
  try {
    return await http.post<AssistantResponse[]>(
      `${import.meta.env.VITE_ASSISTANT_API}/user-question`,
      { threadId, question }
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error posting question, try again later');
  }
};
