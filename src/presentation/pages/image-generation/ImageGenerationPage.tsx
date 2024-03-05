import { useState } from 'react';
import {
  GptMessageImage,
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';
import { imageGenerationUseCase } from '../../../core/use-cases';
import { useScroll } from '../../../hooks/useScroll';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { messagesEndRef } = useScroll(messages);

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

          <div ref={messagesEndRef} />
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Write here your shit"
        disableCorrections
      />
    </div>
  );
};

export default ImageGenerationPage;
