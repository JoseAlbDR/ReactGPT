import { useEffect, useRef } from 'react';

interface Props {
  text?: string;
  imageUrl: string;
  alt: string;
  onImageSelected?: (imageUrl: string) => void;
}

const GptMessageSelectableImage = ({
  imageUrl,
  alt,
  onImageSelected,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;
    originalImageRef.current = image;

    image.onload = () => {
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [imageUrl]);

  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <canvas ref={canvasRef} width={1024} height={1024} />
          {/* <span>{text}</span> */}
          {/* <img
            src={imageUrl}
            alt={alt}
            className="rounded-xl w-96 h-96 object-cover"
            onClick={() => onImageSelected && onImageSelected(imageUrl)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default GptMessageSelectableImage;
