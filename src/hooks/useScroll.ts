import { useRef } from 'react';

export const useScroll = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return { messagesEndRef, scrollToBottom };
};
