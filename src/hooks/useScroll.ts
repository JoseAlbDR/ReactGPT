import { useEffect, useRef } from 'react';
import { Message } from '../interfaces';

export const useScroll = (messages: Message[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return { messagesEndRef };
};
