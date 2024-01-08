import { useState } from 'react';
import {
  GptMessage,
  GptOrthographyMessage,
  TextMessageBox,
  TypingLoader,
  UserMessage,
} from '../../components';
import { orthographyUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const { ok, message, errors, userScore } = await orthographyUseCase(text);

    if (!ok) {
      setIsLoading(false);
      setMessages((prev) => [...prev, { text: message, isGpt: true }]);
    }

    setIsLoading(false);
    setMessages((prev) => [
      ...prev,
      {
        text: message,
        isGpt: true,
        info: {
          errors,
          userScore,
          message,
        },
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hello there!, you can write your text in english and I will help you with the corrections" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage key={index} {...message.info!} />
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
  );
};

export default OrthographyPage;
