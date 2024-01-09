import { useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';
import { proStreamConsUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    //TODO: UseCase

    await proStreamConsUseCase(text);

    setIsLoading(false);

    //TODO: Add message isGpt true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text=" Hello there!, you can write anything you want to compare and give my point of view" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text="OpenAI!" />
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

export default ProsConsStreamPage;
