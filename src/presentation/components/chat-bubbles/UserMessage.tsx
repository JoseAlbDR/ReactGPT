interface Props {
  text: string;
}

const MyMessage = ({ text }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-500 flex-shrink-0">
          U
        </div>
      </div>
      <div className="relative mr-3 text-sm bg-purple-700 py-2 px-4 shadow rounded-xl">
        {text}
      </div>
    </div>
  );
};

export default MyMessage;
