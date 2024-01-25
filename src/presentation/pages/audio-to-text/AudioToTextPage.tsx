import { useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBoxFile,
} from '../../components';
import { audioToTextUseCase } from '../../../core/use-cases/text-audio/audio-to-text.use-case';

interface Message {
  text: string;
  isGpt: boolean;
}

const AudioToText = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    if (text === '') text = audioFile.name;

    const { ok, data } = await audioToTextUseCase({
      prompt: text,
      file: audioFile,
    });

    if (!ok || !data) {
      setMessages((prev) => [...prev, { text: data!.text!, isGpt: true }]);
      setIsLoading(false);
      return;
    }

    const gptMessage = `## Transcription:
__Duration:__ ${Math.round(data!.duration!)}
### Text: 
${data.text}
    `;

    setMessages((prev) => [
      ...prev,
      { text: gptMessage, isGpt: true, type: 'text' },
    ]);

    for (const segment of data.segments) {
      const segmentMessage = `
__From ${Math.round(segment.start)} to ${Math.round(segment.end)} seconds:__
${segment.text}
      `;

      setMessages((prev) => [
        ...prev,
        { text: segmentMessage, isGpt: true, type: 'text' },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hello there!, select a file that you want me to transcribe!" />

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

      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Write here your shit"
        disableCorrections
        accept="audio/*"
      />
    </div>
  );
};

export default AudioToText;
