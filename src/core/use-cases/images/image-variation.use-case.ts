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
export const imageVariationUseCase = async (
  originalImage: string
): Promise<GeneratedImage> => {
  try {
    const response = await http.post<ImageResponse>(
      `${import.meta.env.VITE_GPT_API}/image-variation`,
      {
        baseImage: originalImage,
      }
    );

    return { url: response.url, alt: response.revised_prompt };
  } catch (error) {
    console.log(error);
    return null;
  }
};
