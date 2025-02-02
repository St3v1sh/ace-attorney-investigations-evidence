import { useState } from "react";
import "./DetailImages.css";

// Get the video ID from the URL, or return undefined if not a YouTube video.
const getYouTubeVideoId = (url: string) => {
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|live\/|shorts\/|.*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : undefined;
};

interface DetailImagesProps {
  data: string[];
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const DetailImages: React.FC<DetailImagesProps> = ({
  data,
  isVisible,
  setIsVisible,
}) => {
  const [activeDetailImage, setActiveDetailImage] = useState(0);

  const previousDetailImage = () => {
    setActiveDetailImage((previousActiveDetailImage) =>
      Math.max(0, previousActiveDetailImage - 1)
    );
  };

  const nextDetailImage = () => {
    setActiveDetailImage((previousActiveDetailImage) => {
      if (previousActiveDetailImage === data.length - 1) {
        setIsVisible(false);
        setActiveDetailImage(0);
        return previousActiveDetailImage;
      } else {
        return previousActiveDetailImage + 1;
      }
    });
  };

  return (
    isVisible && (
      <div
        className="details-background"
        onClick={() => nextDetailImage()}
        aria-label="Next details image"
      >
        <div className="details-container">
          <div className="details-image-container">
            {data.map((link, index) =>
              getYouTubeVideoId(link)
                ? index === activeDetailImage && (
                    <div
                      className="details-image"
                      key={index}
                      style={{
                        backgroundColor: "black",
                        color: "var(--primary-color-text)",
                        width: "100%",
                        height: "100%",
                        padding: "0.5rem",
                      }}
                    >
                      YouTube embeds are currently disallowed.
                    </div>
                  )
                : index === activeDetailImage && (
                    <div className="details-image-link-container">
                      <a
                        className="details-image-link"
                        href={link}
                        target="_blank"
                        onClick={(event) => event.stopPropagation()}
                        key={index}
                      >
                        <img
                          className="details-image"
                          src={link}
                          alt="Detail image imgur link."
                        />
                      </a>
                    </div>
                  )
            )}
          </div>
          <div className="details-controls-container">
            <div className="details-controls">
              <button
                className={
                  "details-button" +
                  (activeDetailImage === 0 ? " disabled" : "")
                }
                onClick={(event) => {
                  event.stopPropagation();
                  previousDetailImage();
                }}
                aria-label="Previous details image"
              >
                <svg
                  className="details-button-left-svg"
                  fill="#313131"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                  enableBackground="new 0 0 52 52"
                  xmlSpace="preserve"
                  width={"2.7rem"}
                  style={{ transform: "translateX(-0.1rem)" }}
                >
                  <path d="M38,8.3v35.4c0,1-1.3,1.7-2.2,0.9L14.6,27.3c-0.8-0.6-0.8-1.9,0-2.5L35.8,7.3C36.7,6.6,38,7.2,38,8.3z"></path>{" "}
                </svg>
              </button>
              <span className="details-pagination">{`${
                activeDetailImage + 1
              } / ${data.length}`}</span>
              <button
                className={
                  "details-button" +
                  (activeDetailImage === data.length - 1 ? " disabled" : "")
                }
                onClick={(event) => {
                  if (activeDetailImage === data.length - 1) {
                    event.stopPropagation();
                  }
                }}
              >
                <svg
                  className="details-button-right-svg"
                  fill="#313131"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                  enableBackground="new 0 0 52 52"
                  xmlSpace="preserve"
                  width={"2.7rem"}
                  style={{ transform: "scale(-1, 1) translateX(-0.1rem)" }}
                >
                  <path d="M38,8.3v35.4c0,1-1.3,1.7-2.2,0.9L14.6,27.3c-0.8-0.6-0.8-1.9,0-2.5L35.8,7.3C36.7,6.6,38,7.2,38,8.3z"></path>{" "}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DetailImages;
