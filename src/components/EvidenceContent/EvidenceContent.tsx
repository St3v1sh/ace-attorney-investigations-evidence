import { Evidence } from "../../utils/types";
import ItemCarousel from "../ItemCarousel/ItemCarousel";
import SafeImage from "../SafeImage/SafeImage";
import "./EvidenceContent.css";

interface EvidenceContentProps {
  evidence: Evidence[];
}

const EvidenceContent: React.FC<EvidenceContentProps> = ({ evidence }) => {
  return (
    <div className="evidence-content-container">
      <div className="evidence-detail-container">
        <div className="evidence-detail-container-background">
          <div className="evidence-detail">
            <div className="evidence-detail-left">
              <button
                className="evidence-detail-image-container"
                style={{ cursor: "pointer" }}
              >
                <SafeImage src="" alt="" className="evidence-detail-image" />
                {/* Hover hint */}
                <div className="evidence-image-hover-overlay">
                  <span className="evidence-image-hover-overlay-hint">
                    Click for details
                  </span>
                </div>
                {/* Click hint */}
                <div className="click-hint">
                  <svg
                    viewBox="0 0 76 76"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="matrix(-1, 0, 0, 1, 0, 0)"
                  >
                    <filter
                      id="magnifier-shadow"
                      x="0"
                      y="0"
                      width="200%"
                      height="200%"
                    >
                      <feDropShadow
                        dx="3"
                        dy="3"
                        stdDeviation="1.5"
                        floodColor="black"
                        floodOpacity="0.8"
                      />
                    </filter>
                    <path
                      fill="#FFD700"
                      filter="url(#magnifier-shadow)"
                      d="M 42.5,22C 49.4036,22 55,27.5964 55,34.5C 55,41.4036 49.4036,47 42.5,47C 40.1356,47 37.9245,46.3435 36,45.2426L 26.9749,54.2678C 25.8033,55.4393 23.9038,55.4393 22.7322,54.2678C 21.5607,53.0962 21.5607,51.1967 22.7322,50.0251L 31.7971,40.961C 30.6565,39.0755 30,36.8644 30,34.5C 30,27.5964 35.5964,22 42.5,22 Z M 42.5,26C 37.8056,26 34,29.8056 34,34.5C 34,39.1944 37.8056,43 42.5,43C 47.1944,43 51,39.1944 51,34.5C 51,29.8056 47.1944,26 42.5,26 Z "
                    ></path>
                  </svg>
                </div>
              </button>
              <div className="evidence-detail-ribbon-container">
                <div className="evidence-detail-ribbon">
                  <div className="evidence-detail-ribbon-stitch">
                    <div className="evidence-detail-ribbon-inner"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="evidence-info-container">
              <div className="evidence-title">HH-3000 Bomb</div>
              <div className="evidence-description-container">
                <div className="evidence-description">
                  <span className="evidence-description-text">
                    testing testing testing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <ItemCarousel />
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
    </div>
  );
};

export default EvidenceContent;
