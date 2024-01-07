import './TypingLoader.css';

interface Props {
  className?: string;
}

const TypingLoader = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className="typing">
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
      </div>
    </div>
  );
};

export default TypingLoader;
