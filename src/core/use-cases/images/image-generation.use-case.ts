import { http } from '../../../adapters';

type GeneratedImage = Image | null;

interface Image {
  url: string;
  alt: string;
}

interface ImageResponse {
  url: string;
  openAIUrl: string;
  revised_prompt: string;
}
export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string
): Promise<GeneratedImage> => {
  try {
    const response = await http.post<ImageResponse>(
      `${import.meta.env.VITE_GPT_API}/image-generator`,
      {
        prompt,
        originalImage,
        maskImage,
      }
    );

    return { url: response.url, alt: response.revised_prompt };
  } catch (error) {
    console.log(error);
    return null;
  }
};
