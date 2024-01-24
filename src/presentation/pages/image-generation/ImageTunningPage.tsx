import { useState } from 'react';
import {
  GptMessageImage,
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';
import { imageGenerationUseCase } from '../../../core/use-cases';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [originalImageAndMas, setOriginalImageAndMask] = useState({
    original:
      'http://localhost:3000/gpt/image-generator/dbb85cec-733a-4e2a-a103-ebbe2c558d9b.png' as
        | string
        | undefined,
    mask: undefined as string | undefined,
  });

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const image = await imageGenerationUseCase(text);
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

    //TODO: Add message isGpt true
  };

  return (
    <>
      {originalImageAndMas.original && (
        <div className="fixed flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Editing</span>
          <img
            className="border rounded-xl w-36 h36 object-contain"
            src={originalImageAndMas.original}
            alt="original image"
          />
          <button className="btn-primary mt-2">Generate Variation</button>
        </div>
      )}
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            <GptMessage text="What kind of image do you want to generate today?" />

            {messages.map((message, index) =>
              message.isGpt ? (
                <GptMessageImage
                  key={index}
                  alt={message.info!.alt}
                  imageUrl={message.info!.imageUrl}
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
