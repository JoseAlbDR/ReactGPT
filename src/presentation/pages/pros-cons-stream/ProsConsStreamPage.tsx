/* eslint-disable no-constant-condition */
import { useRef, useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';
import { prosConsStreamGeneratorUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const stream = prosConsStreamGeneratorUseCase(
      text,
      abortController.current.signal
    );
    setIsLoading(false);

    setMessages((prev) => [...prev, { text: '', isGpt: true }]);

    for await (const text of stream) {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = text;
        return newMessages;
      });
    }
    isRunning.current = false;

    // const reader = await proStreamConsUseCase(text);
    // setIsLoading(false);

    // if (!reader) return;

    // const decoder = new TextDecoder();
    // let message = '';
    // setMessages((prev) => [...prev, { text: message, isGpt: true }]);

    // while (true) {
    //   const { value, done } = await reader.read();
    //   if (done) break;

    //   const decodedChunk = decoder.decode(value, { stream: true });

    //   message += decodedChunk;

    //   setMessages((prev) => {
    //     const newMessages = [...prev];
    //     newMessages[newMessages.length - 1].text = message;
    //     return newMessages;
    //   });
    // }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text=" Hello there!, you can write anything you want to compare and give my point of view" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
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
