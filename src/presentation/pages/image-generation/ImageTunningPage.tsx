import { useState } from 'react';
import {
  // GptMessageImage,
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
  GptMessageSelectableImage,
} from '../../components';
import {
  imageGenerationUseCase,
  imageVariationUseCase,
} from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      isGpt: true,
      text: 'Base image',
      info: {
        imageUrl:
          'http://localhost:3000/gpt/image-generator/11c9faff-ba05-4709-a531-b54a1df3fa4f.png',
        alt: 'Base image',
      },
    },
  ]);
  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariation = async () => {
    setIsLoading(true);
    const image = await imageVariationUseCase(originalImageAndMask.original!);
    setIsLoading(false);

    if (!image) return;

    setMessages((prev) => [
      ...prev,
      {
        text: 'Variation',
        isGpt: true,
        info: {
          imageUrl: image.url,
          alt: image.alt,
        },
      },
    ]);
  };

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);
    const { original, mask } = originalImageAndMask;

    const image = await imageGenerationUseCase(text, original, mask);
    setIsLoading(false);

    if (!image) {
      setMessages((prev) => [
        ...prev,
        { text: 'Error Generating image', isGpt: true },
      ]);
    }

    setMessages((prev) => [
      ...prev,
      {
        text,
        isGpt: true,
        info: {
          imageUrl: image!.url,
          alt: image!.alt,
        },
      },
    ]);
  };

  return (
    <>
      {originalImageAndMask.original && (
        <div className="fixed flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Editing</span>
          <img
            className="border rounded-xl w-36 h36 object-contain"
            src={
              originalImageAndMask.mask
                ? originalImageAndMask.mask
                : originalImageAndMask.original
            }
            alt="original image"
          />
          <button className="btn-primary mt-2" onClick={handleVariation}>
            Generate Variation
          </button>
        </div>
      )}
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            <GptMessage text="What kind of image do you want to generate today?" />

            {messages.map((message, index) =>
              message.isGpt ? (
                // <GptMessageImage
                <GptMessageSelectableImage
                  key={index}
                  alt={message.info!.alt}
                  imageUrl={message.info!.imageUrl}
                  onImageSelected={(maskImageUrl) =>
                    setOriginalImageAndMask({
                      original: message.info?.imageUrl,
                      mask: maskImageUrl,
                    })
                  }
                />
              ) : (
                <UserMessage key={index} text={message.text} />
              )
            )}

            {isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )}
          </div>
        </div>

        <TextMessageBox
          onSendMessage={handlePost}
          placeholder="Write here your shit"
          disableCorrections
        />
      </div>
    </>
  );
};

export default ImageTunningPage;
