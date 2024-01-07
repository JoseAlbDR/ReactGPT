import { GptMessage, TypingLoader, UserMessage } from '../../components';

const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hello there!, you can write your text in english and I will help you with the corrections" />

          <UserMessage text="Hello there! " />

          <TypingLoader className="fade-in" />
        </div>
      </div>
    </div>
  );
};

export default OrthographyPage;
