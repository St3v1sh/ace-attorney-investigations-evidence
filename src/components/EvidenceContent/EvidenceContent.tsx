import { useEffect, useState } from "react";
import { Evidence } from "../../utils/types";
import ItemCarousel from "../ItemCarousel/ItemCarousel";
import SafeImage from "../SafeImage/SafeImage";
import "./EvidenceContent.css";
import DetailImages from "../DetailImages/DetailImages";

interface EvidenceContentProps {
  evidenceList: Evidence[];
}

const EvidenceContent: React.FC<EvidenceContentProps> = ({ evidenceList }) => {
  const [activeEvidence, setActiveEvidence] = useState(0);
  const [isDetailPanelVisible, setIsDetailPanelVisible] = useState(false);

  const evidenceExists = activeEvidence < evidenceList.length;
  const evidenceHasAdditionalImages =
    evidenceExists && evidenceList[activeEvidence].additionalImages.length > 0;

  // Change activeEvidence to 0 when evidenceList changes.
  useEffect(() => {
    setActiveEvidence(0);
  }, [evidenceList]);

  return (
    <>
      <div className="evidence-content-container">
        <div className="evidence-detail-container">
          <div className="evidence-detail-container-background">
            <div className="evidence-detail">
              <div className="evidence-detail-left">
                <button
                  className="evidence-detail-image-container"
                  style={{
                    cursor: evidenceHasAdditionalImages ? "pointer" : "default",
                  }}
                  onClick={() => {
                    if (evidenceHasAdditionalImages) {
                      setIsDetailPanelVisible(true);
                    }
                  }}
                >
                  {/* Evidence image */}
                  <SafeImage
                    src={
                      evidenceExists
                        ? evidenceList[activeEvidence].imageUrl
                        : ""
                    }
                    alt=""
                    className="evidence-detail-image"
                  />
                  {evidenceHasAdditionalImages && (
                    <>
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
                    </>
                  )}
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
                {/* Evidence name */}
                <span className="evidence-title">
                  {evidenceExists && evidenceList[activeEvidence].name
                    ? evidenceList[activeEvidence].name
                    : "???"}
                </span>
                <div className="evidence-description-container">
                  <div className="evidence-description">
                    {/* Evidence description */}
                    <span className="evidence-description-text">
                      {evidenceExists
                        ? evidenceList[activeEvidence].description
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ItemCarousel
          itemList={evidenceList}
          activeItem={activeEvidence}
          setActiveItem={setActiveEvidence}
        />
      </div>
      <DetailImages
        data={evidenceList[activeEvidence]?.additionalImages || []}
        isVisible={isDetailPanelVisible}
        setIsVisible={setIsDetailPanelVisible}
      />
    </>
  );
};

export default EvidenceContent;
