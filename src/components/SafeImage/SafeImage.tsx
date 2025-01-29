import { useEffect, useState } from "react";
import "./SafeImage.css";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  props?: React.HTMLAttributes<HTMLImageElement>;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <img
      {...props}
      alt={alt}
      onError={() => setHasError(true)}
      src={!hasError && src ? src : ""}
      style={{
        background:
          hasError || !src
            ? "repeating-conic-gradient(#ff00ff 0% 25%, #000000 0% 50%) 0% 0% / 2rem 2rem"
            : "none",
      }}
      className={className}
    />
  );
};

export default SafeImage;
