import React, { useEffect, useState } from "react";
import background from "./assets/court-bg.jpg";
import { Evidence } from "./utils/types";
import EvidenceContent from "./components/EvidenceContent/EvidenceContent";
import "./App.css";
import ProfileContent from "./components/ProfileContent/ProfileContent";

const App: React.FC = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbyx7_X-nLwHXVufOIi4sUD7rgc_tqO8rg4kpau7rQl62CIwvIkguPoecTSi4QgNZLbBug/exec";

  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  interface Error {
    id: number;
    message: string;
  }
  const [error, setError] = useState<Error[]>([]);

  type ActiveTab = "Evidence" | "Profiles";
  const [activeTab, setActiveTab] = useState<ActiveTab>("Evidence");

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
    if (loading) return;
    setLoading(true);
    setError([]);

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
        console.log(data);
      })
      .catch((err) => {
        const errorId = Date.now();
        setError((previousErrors) => [
          ...previousErrors,
          { id: errorId, message: err.message },
        ]);

        setTimeout(() => {
          setError((previousErrors) =>
            previousErrors.filter((error) => error.id !== errorId)
          );
        }, 5000);

        setLoading(false);
      });
  };

  const changeTab = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const closeError = (id: number) => {
    setError((previousErrors) =>
      previousErrors.filter((error) => error.id !== id)
    );
  };

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <button className="tab" onClick={() => changeTab("Evidence")}>
                <div className="tab-background paper-background"></div>
                <div className="tab-content">Evidence</div>
                {activeTab !== "Evidence" && <div className="tab-shadow"></div>}
              </button>
              <button className="tab" onClick={() => changeTab("Profiles")}>
                <div className="tab-background paper-background"></div>
                <div className="tab-content">Profiles</div>
                {activeTab !== "Profiles" && <div className="tab-shadow"></div>}
              </button>
              <div className="refresh-container">
                <button className="refresh" onClick={update}>
                  <span className={loading ? " spinning" : ""}>
                    <svg
                      className="spinner"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                    >
                      <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="content-background paper-background"></div>
            {activeTab === "Evidence" ? (
              <div className="content" key="evidence">
                <EvidenceContent />
              </div>
            ) : (
              <div className="content" key="profiles">
                <ProfileContent />
              </div>
            )}
          </div>
          <div className="lacing-bottom"></div>
        </div>
        {error && (
          <div className="error-container">
            {error.map((err) => (
              <button className="error" onClick={() => closeError(err.id)}>
                {err.message}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
