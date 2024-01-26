import { useEffect, useState } from 'react';
import {
  GptMessage,
  UserMessage,
  TypingLoader,
  TextMessageBox,
} from '../../components';
import {
  createThreadUseCase,
  postQuestionUseCase,
} from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}

const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem('threadId');

    if (id) {
      setThreadId(id);
    } else {
      createThreadUseCase().then((id) => {
        setThreadId(id);
        localStorage.setItem('threadId', id);
      });
    }
  }, []);

  useEffect(() => {
    if (threadId)
      setMessages((prev) => [
        ...prev,
        { text: `Thread ID ${threadId}`, isGpt: true },
      ]);
  }, [threadId]);

  const handlePost = async (text: string) => {
    if (!threadId) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const replies = await postQuestionUseCase({ question: text, threadId });

    setIsLoading(false);

    console.log({ replies });

    const lastMessage = replies.at(-1)!;

    lastMessage.content.forEach((message) => {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: lastMessage.role === 'assistant',
          info: lastMessage,
        },
      ]);
    });

    // for (const reply of replies) {
    //   for (const message of reply.content) {
    //     setMessages((prev) => [
    //       ...prev,
    //       { text: message, isGpt: reply.role === 'assistant', info: reply },
    //     ]);
    //   }
    // }

    setMessages((prev) => [...prev]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hello there!, Im C3PO your personal assistant, how can I help you today?" />

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

export default AssistantPage;
