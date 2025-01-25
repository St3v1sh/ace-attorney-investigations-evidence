import React, { useEffect, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  interface Evidence {
    title: string;
    description: string;
    imageUrl: string;
    additionalImages: string[];
  }

  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<{
    images: string[];
    description: string;
  } | null>(null);

  useEffect(() => {
    // Scale if mobile.
    const urlParams = new URLSearchParams(window.location.search).get(
      "platform"
    );
    if (urlParams === "mobile") {
      document.documentElement.style.fontSize = "40%";
    }
  }, []);

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response error");
    }
    const data = await response.json();
    return data.values.filter(
      (data: string[]) => !data.every((value: string) => value === "")
    );
  };

  const update = () => {
    setLoading(true);
    setError(null);

    const url =
      "https://script.google.com/macros/s/AKfycbyx7_X-nLwHXVufOIi4sUD7rgc_tqO8rg4kpau7rQl62CIwvIkguPoecTSi4QgNZLbBug/exec";

    fetchData(url)
      .then((data) => {
        setEvidenceList(
          data.map((d: string[]) => ({
            title: d[0],
            description: d[1],
            imageUrl: d[2],
            additionalImages: d[3]
              ? d[3].split(",").map((s: string) => s.trim())
              : [],
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = (evidence: Evidence) => {
    console.log(evidence);
    const images =
      evidence.additionalImages.length === 0
        ? [evidence.imageUrl]
        : evidence.additionalImages;
    setModalContent({ images, description: evidence.description });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="app">
      <div id="update-container">
        <button id="update" onClick={update}>
          &#x21BB;
        </button>
      </div>
      <div id="content">
        {loading && <span className="loading">LOADING</span>}
        {error && <span>Error loading: {error}</span>}
        {!loading &&
          !error &&
          evidenceList.map((evidence, i) => (
            <button key={i} onClick={() => handleButtonClick(evidence)}>
              <img src={evidence.imageUrl} alt="" />
              <span className="title">{evidence.title}</span>
              <div className="animate-right"></div>
            </button>
          ))}
      </div>
      {modalContent && (
        <div id="modal" className="slide-in" onClick={closeModal}>
          <div>
            {modalContent.images.map((img, index) => (
              <img key={index} src={img} alt="" />
            ))}
          </div>
          <span className="description">{modalContent.description}</span>
          <button onClick={closeModal}>OK</button>
        </div>
      )}
    </div>
  );
};

export default App;
