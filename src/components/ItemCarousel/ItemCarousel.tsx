import { Evidence } from "../../utils/types";
import SafeImage from "../SafeImage/SafeImage";
import "./ItemCarousel.css";

interface ItemCarouselProps {
  evidenceList: Evidence[];
  activeEvidence: number;
  setActiveEvidence: (activeEvidence: number) => void;
}

const ItemCarousel: React.FC<ItemCarouselProps> = ({
  evidenceList,
  activeEvidence,
  setActiveEvidence,
}) => {
  return (
    <div className="pagination-container">
      <div className="evidence-controls-container">
        <button className="evidence-controls">
          <svg
            fill="#925c1f"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            width={"2.5rem"}
            height={"3.5rem"}
          >
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#462c0e"
              strokeWidth="10"
            >
              <filter
                id="arrow-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="15"
                  dy="15"
                  stdDeviation="10"
                  floodColor="black"
                  floodOpacity="0.8"
                />
              </filter>
              <path
                filter="url(#arrow-shadow)"
                d="M366.326 2.877c-16.847-6.426-35.491-1.883-47.497 11.572L128.884 227.314c-14.592 16.353-14.592 41.019.001 57.372l189.944 212.865c8.386 9.399 20.012 14.448 32.004 14.448 5.172 0 10.415-.938 15.493-2.874 16.847-6.425 27.734-22.227 27.734-40.259V43.135c0-18.031-10.885-33.833-27.734-40.258z"
              ></path>
            </g>
          </svg>
        </button>
        <div className="evidence-list">
          <div className="carousel">
            {/* Evidence goes here */}
            {evidenceList.map((evidence, index) => {
              return (
                <button
                  className="carousel-item"
                  key={index}
                  onClick={() => setActiveEvidence(index)}
                >
                  <SafeImage
                    src={evidence.imageUrl}
                    alt=""
                    className="carousel-image"
                  />
                  <div
                    className={
                      "carousel-item-shadow" +
                      (index === activeEvidence ? " active" : "")
                    }
                  ></div>
                </button>
              );
            })}
          </div>
        </div>
        <button className="evidence-controls">
          <svg
            fill="#925c1f"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            width={"2.5rem"}
            height={"3.5rem"}
            transform="matrix(-1, 0, 0, 1, 0, 0)"
          >
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#462c0e"
              strokeWidth="10"
            >
              <filter
                id="arrow-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="15"
                  dy="15"
                  stdDeviation="10"
                  floodColor="black"
                  floodOpacity="0.8"
                />
              </filter>
              <path
                filter="url(#arrow-shadow)"
                d="M366.326 2.877c-16.847-6.426-35.491-1.883-47.497 11.572L128.884 227.314c-14.592 16.353-14.592 41.019.001 57.372l189.944 212.865c8.386 9.399 20.012 14.448 32.004 14.448 5.172 0 10.415-.938 15.493-2.874 16.847-6.425 27.734-22.227 27.734-40.259V43.135c0-18.031-10.885-33.833-27.734-40.258z"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <div className="page-indicator">
        {/* Pagination indicators here. */}
        <div className="active"></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ItemCarousel;
