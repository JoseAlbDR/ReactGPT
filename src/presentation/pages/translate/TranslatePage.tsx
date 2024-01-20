import { useRef, useState } from 'react';
import {
  GptMessage,
  TextMessageBoxSelect,
  TypingLoader,
  UserMessage,
} from '../../components';
import { translateStreamGeneratorUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: 'alemán', text: 'Alemán' },
  { id: 'árabe', text: 'Árabe' },
  { id: 'bengalí', text: 'Bengalí' },
  { id: 'español', text: 'Español' },
  { id: 'francés', text: 'Francés' },
  { id: 'hindi', text: 'Hindi' },
  { id: 'inglés', text: 'Inglés' },
  { id: 'japonés', text: 'Japonés' },
  { id: 'mandarín', text: 'Mandarín' },
  { id: 'portugués', text: 'Portugués' },
  { id: 'ruso', text: 'Ruso' },
];

const TranslatePage = () => {
  const abortController = useRef(new AbortController());
  const [isLoading, setIsLoading] = useState(false);
  const isRunning = useRef(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    setIsLoading(true);
    isRunning.current = true;
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const stream = translateStreamGeneratorUseCase(
      { lang: selectedOption, prompt: text },
      abortController.current.signal
    );

    setIsLoading(false);

    setMessages((prev) => [...prev, { text: '', isGpt: true }]);

    for await (const res of stream) {
      if (!res.ok) {
        setMessages((prev) => [...prev, { text: res.message, isGpt: true }]);
        break;
      }

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = res.message;
        return newMessages;
      });
    }

    isRunning.current = false;
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text=" Hello there!, you can write anything you want and I will translate it to the selected language" />

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

      <TextMessageBoxSelect onSendMessage={handlePost} options={languages} />
    </div>
  );
};

export default TranslatePage;
