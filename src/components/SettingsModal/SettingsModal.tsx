import { useEffect, useState } from "react";
import "./SettingsModal.css";

interface SettingsContainerProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({
  isVisible,
  setIsVisible,
}) => {
  const baseSize = 16;
  const [zoomPercentage, setZoomPercentage] = useState(100);

  const zoomOut = () => {
    const newZoomPercentage = zoomPercentage - 20;
    if (newZoomPercentage >= 40) {
      setZoomPercentage(newZoomPercentage);
      saveZoom(newZoomPercentage);
    }
  };

  const zoomIn = () => {
    const newZoomPercentage = zoomPercentage + 20;
    if (newZoomPercentage <= 300) {
      setZoomPercentage(newZoomPercentage);
      saveZoom(newZoomPercentage);
    }
  };

  const saveZoom = (percentage: number) => {
    const zoomSettingName = getZoomSettingName();
    localStorage.setItem(zoomSettingName, percentage.toString());
  };

  const getZoomSettingName = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("platform") === "mobile") {
      return "mobileZoomPercentage";
    }
    return "zoomPercentage";
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${
      (baseSize * zoomPercentage) / 100
    }px`;
  }, [zoomPercentage]);

  // Load zoom percentage from local storage.
  useEffect(() => {
    const zoomSettingName = getZoomSettingName();
    const storedZoomPercentage = localStorage.getItem(zoomSettingName);
    if (storedZoomPercentage) {
      setZoomPercentage(parseInt(storedZoomPercentage));
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("platform") === "mobile") {
        setZoomPercentage(80);
      }
    }
  }, []);

  return (
    isVisible && (
      <div className="settings-container">
        <div className="zoom-options">
          <div className="zoom-icon">
            <svg
              fill="var(--primary-color-text)"
              version="1.1"
              id="Ebene_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <g>
                <path d="M21,42c5.071,0,9.728-1.808,13.361-4.811L38.172,41l-1.586,1.586c-0.781,0.781-0.781,2.047,0,2.828l18,18 C54.977,63.805,55.488,64,56,64s1.023-0.195,1.414-0.586l6-6c0.781-0.781,0.781-2.047,0-2.828l-18-18 c-0.781-0.781-2.047-0.781-2.828,0L41,38.172l-3.811-3.811C40.192,30.728,42,26.071,42,21C42,9.42,32.579,0,21,0S0,9.42,0,21 S9.421,42,21,42z M59.172,56L56,59.171L40.828,44L44,40.829L59.172,56z M21,4c9.374,0,17,7.626,17,17s-7.626,17-17,17 S4,30.374,4,21S11.626,4,21,4z"></path>{" "}
                <path d="M12,23h7v7c0,1.104,0.896,2,2,2s2-0.896,2-2v-7h7c1.104,0,2-0.896,2-2s-0.896-2-2-2h-7v-7c0-1.104-0.896-2-2-2 s-2,0.896-2,2v7h-7c-1.104,0-2,0.896-2,2S10.896,23,12,23z"></path>{" "}
              </g>
            </svg>
          </div>
          <div className="zoom-percentage-container">
            <span className="zoom-percentage">{zoomPercentage}%</span>
          </div>
          <button className="zoom-button zoom-out" onClick={zoomOut}>
            <svg
              width="1.4rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 12H18" stroke="var(--primary-color-text)"></path>
            </svg>
          </button>
          <button className="zoom-button zoom-in" onClick={zoomIn}>
            <svg
              width="1.4rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 6V18" stroke="var(--primary-color-text)"></path>
              <path d="M6 12H18" stroke="var(--primary-color-text)"></path>
            </svg>
          </button>
        </div>
        <button className="settings-close" onClick={() => setIsVisible(false)}>
          <svg
            width="2rem"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 7L15 12L10 17"
              stroke="var(--primary-color-text)"
            ></path>
          </svg>
        </button>
      </div>
    )
  );
};

export default SettingsContainer;
