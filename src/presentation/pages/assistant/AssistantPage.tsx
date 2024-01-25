import { useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';

interface Message {
  text: string;
  isGpt: boolean;
}

const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    //TODO: UseCase

    setIsLoading(false);

    //TODO: Add message isGpt true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hello there!, Im C3PO your personal assistant, how can I help you today?" />

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

export default AssistantPage;
