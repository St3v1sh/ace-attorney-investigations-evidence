import React, { useEffect, useState } from "react";
import background from "./assets/court-bg.jpg";
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
  // const [modalContent, setModalContent] = useState<{
  //   images: string[];
  //   description: string;
  // } | null>(null);

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

  // const handleButtonClick = (evidence: Evidence) => {
  //   const images =
  //     evidence.additionalImages.length === 0
  //       ? [evidence.imageUrl]
  //       : evidence.additionalImages;
  //   setModalContent({ images, description: evidence.description });
  // };

  // const closeModal = () => {
  //   setModalContent(null);
  // };

  return (
    <>
      <div
        className="background"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="crt"></div>
      <div className="book-container">
        <div className="leather-binding">
          <div className="lacing-top"></div>
          <div className="content-container">
            <div className="tabs-container">
              <div className="tab">
                <div className="tabs-container-background paper-background"></div>
                <div className="tab-content">test</div>
              </div>
              <div className="tab">
                <div className="tabs-container-background paper-background"></div>
                <div className="tab-content">test</div>
              </div>
            </div>
            <div className="content-background paper-background"></div>
            <div className="content">test</div>
          </div>
          <div className="lacing-bottom"></div>
        </div>
      </div>
    </>
  );
};

export default App;