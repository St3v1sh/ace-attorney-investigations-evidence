import SafeImage from "../SafeImage/SafeImage";
import "./EvidenceContent.css";

const EvidenceContent: React.FC = () => {
  return (
    <div className="evidence-content-container">
      <div className="evidence-detail-container">
        <div className="evidence-detail-container-background">
          <div className="evidence-detail">
            <div className="evidence-detail-left">
              <div className="evidence-detail-image-container">
                <SafeImage src="" alt="" className="evidence-detail-image" />
              </div>
              <div className="evidence-detail-ribbon-container">
                <div className="evidence-detail-ribbon">
                  <div className="evidence-detail-ribbon-stitch">
                    <div className="evidence-detail-ribbon-inner"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="evidence-detail-description">
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
              testing testing testing testing testing testing testing testing
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-container">
        <div className="evidence-list-container">{/* Evidence go here */}</div>
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
