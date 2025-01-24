import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<{ images: string[], description: string } | null>(null);

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Response error');
    }
    const data = await response.json();
    return data.values.slice(1).filter((d: any[]) => !d.every((v) => v === ""));
  };

  const update = () => {
    setLoading(true);
    setError(null);

    const url = "https://script.google.com/macros/s/AKfycbx7tUkCXq_Qx1vB89OKpXUuMntd2JTDGDM5nyyOIhUV1T_JKEd5XGUNuTNvDWTeSurQhQ/exec?spreadsheetId=1cFQ63OScDlJGAISzanY2W9goLaFwtEAcP890CBh2A94&sheetName=Sheet1";

    fetchData(url).then((data) => {
      setData(data);
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    update();
  }, []);

  const handleButtonClick = (d: any[]) => {
    const images = d[3] === "" ? [d[2]] : d[3].split(",").map((s: string) => s.trim());
    setModalContent({ images, description: d[1] });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="app">
      <div id="update-container">
        <button id="update" onClick={update}>&#x21BB;</button>
      </div>
      <div id="content">
        {loading && <span className="loading">LOADING</span>}
        {error && <span>Error loading: {error}</span>}
        {!loading && !error && data.map((d, i) => (
          <button key={i} onClick={() => handleButtonClick(d)}>
            <img src={d[2]} alt="" />
            <span className="title">{d[0]}</span>
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
