import "./EvidenceContent.css";

const EvidenceContent: React.FC = () => {
  return (
    <div className="evidence-content-container">
      <div className="evidence-detail-container">
        <div className="evidence-detail-container-background">
          <div className="evidence-detail">
            <img className="evidence-detail-image" src="" alt="" />
          </div>
        </div>
      </div>
      <div className="pagination-container">
        <div className="evidence-list-container">
          {/* Evidence go here */}
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
