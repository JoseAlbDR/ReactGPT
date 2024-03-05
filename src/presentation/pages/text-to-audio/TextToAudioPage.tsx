import { useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBoxSelect,
  GptMessageAudio,
} from '../../components';
import { textToAudioUseCase } from '../../../core/use-cases';
import { useScroll } from '../../../hooks/useScroll';

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text';
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio';
}

type Message = TextMessage | AudioMessage;

const disclaimer = `
## Which audio you want me to generate today?
* All audio is AI generated
`;

const voices = [
  {
    id: 'nova',
    text: 'nova',
  },
  {
    id: 'alloy',
    text: 'alloy',
  },
  {
    id: 'echo',
    text: 'echo',
  },
  {
    id: 'fable',
    text: 'fable',
  },
  {
    id: 'onyx',
    text: 'onyx',
  },
  {
    id: 'shimmer',
    text: 'shimmer',
  },
];

const TextToAudio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const { messagesEndRef } = useScroll(messages);

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false, type: 'text' }]);

    const { ok, message, audioUrl } = await textToAudioUseCase({
      prompt: text,
      voice: selectedVoice,
    });

    // TODO catpure error
    if (!ok) return;

    setMessages((prev) => [
      ...prev,
      {
        text: `${selectedVoice} - ${message}`,
        isGpt: true,
        type: 'audio',
        audio: audioUrl!,
      },
    ]);

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text={disclaimer} />

          {messages.map((message, index) =>
            message.isGpt ? (
              message.type === 'audio' ? (
                <GptMessageAudio
                  key={index}
                  text={message.text}
                  audioUrl={message.audio}
                />
              ) : (
                <GptMessage key={index} text={message.text} />
              )
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

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Write here your shit"
        disableCorrections
        options={voices}
      />
    </div>
  );
};

export default TextToAudio;
