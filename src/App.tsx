import React, { useEffect, useState } from "react";
import background from "./assets/court-bg.jpg";
import { Evidence, Profile } from "./utils/types";
import EvidenceContent from "./components/EvidenceContent/EvidenceContent";
import "./App.css";
import ProfileContent from "./components/ProfileContent/ProfileContent";
import SettingsContainer from "./components/SettingsModal/SettingsModal";

const App: React.FC = () => {
  const url =
    "https://script.google.com/macros/s/AKfycbwoZ4P2IFHQoFx8cwQX-0YIjokkZ_MNlvWqdm_TklAdyYWFtsjhhC4WbbpcaG_jRb-rkw/exec";

  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [profileList, setProfileList] = useState<Profile[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

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
    return await response.json();
  };

  const update = () => {
    if (loading) return;
    setLoading(true);
    setError([]);

    fetchData(url)
      .then((data) => {
        setEvidenceList(
          data.evidence?.map((d: string[]) => ({
            name: d[0],
            description: d[1],
            imageUrl: d[2],
            additionalImages: d[3]
              ? d[3].split(",").map((s: string) => s.trim())
              : [],
          }))
        );
        setProfileList(
          data.profiles?.map((d: string[]) => ({
            name: d[0],
            description: d[1],
            imageUrl: d[2],
            age: d[3],
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        const errorId = Date.now();
        setError((previousErrors) => [
          ...previousErrors,
          { id: errorId, message: "Fetch error. " + err.message },
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
          <div className="lacing-container-top">
            <div className="lacing-top"></div>
          </div>
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
              <div className="options-container">
                <button className="refresh" onClick={update}>
                  <svg
                    className={"spinner" + (loading ? " spinning" : "")}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    fill="var(--primary-color-text)"
                  >
                    <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
                  </svg>
                </button>
                <button
                  className="settings"
                  onClick={() => setIsSettingsVisible(true)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="var(--primary-color-text)"
                    width="1.9rem"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.2994 10.4527L19.2267 10.7677C19.3846 10.7935 19.5003 10.9298 19.5 11.0896V12.883C19.5 13.0412 19.3865 13.1768 19.2303 13.2042L17.3004 13.543C17.1885 13.9298 17.0349 14.3022 16.8415 14.6543L17.9823 16.2382C18.0759 16.3679 18.0612 16.5463 17.9483 16.6595L16.6804 17.9283C16.5682 18.0401 16.3921 18.0561 16.2623 17.9645L14.6627 16.8424C14.3099 17.0387 13.9352 17.1952 13.5442 17.3103L13.2034 19.231C13.176 19.3865 13.0406 19.5 12.8825 19.5H11.0888C10.9294 19.5 10.7934 19.3849 10.7676 19.228L10.4493 17.3168C10.059 17.204 9.6823 17.0485 9.32585 16.8525L7.73767 17.9648C7.60821 18.0558 7.43178 18.0401 7.31992 17.9283L6.05198 16.6595C5.93947 16.5463 5.9248 16.3686 6.01741 16.2391L7.13958 14.6697C6.94163 14.3116 6.78444 13.9337 6.67062 13.5414L4.76905 13.2042C4.61349 13.1765 4.5 13.0412 4.5 12.883V11.0896C4.5 10.9304 4.61544 10.7941 4.77263 10.768L6.67421 10.4514C6.78868 10.0582 6.94586 9.68022 7.14316 9.32315L6.0347 7.73739C5.94371 7.60793 5.95937 7.43185 6.07122 7.32L7.33883 6.0525C7.452 5.94 7.62908 5.925 7.7592 6.01793L9.33433 7.14293C9.68817 6.94924 10.0639 6.795 10.4552 6.6825L10.767 4.77359C10.7927 4.61576 10.929 4.5 11.0888 4.5H12.8825C13.041 4.5 13.1763 4.61413 13.2037 4.77L13.5399 6.68935C13.929 6.8025 14.304 6.95837 14.6591 7.15467L16.2385 6.01957C16.3683 5.92598 16.5464 5.94065 16.6595 6.05348L17.9278 7.32098C18.0397 7.43315 18.0553 7.60957 17.9643 7.73902L16.8392 9.34239C17.0323 9.69424 17.1865 10.066 17.2994 10.4527ZM9.71725 12C9.71725 13.2607 10.7393 14.2826 12.0001 14.2826C13.2608 14.2826 14.2829 13.2607 14.2829 12C14.2829 10.7394 13.2608 9.71742 12.0001 9.71742C10.7393 9.71742 9.71725 10.7394 9.71725 12Z"></path>
                  </svg>
                </button>
              </div>
              <SettingsContainer
                isVisible={isSettingsVisible}
                setIsVisible={setIsSettingsVisible}
              />
            </div>
            <div className="content-background paper-background"></div>
            {activeTab === "Evidence" ? (
              <div className="content" key="evidence">
                <EvidenceContent evidenceList={evidenceList} />
              </div>
            ) : (
              <div className="content" key="profiles">
                <ProfileContent profileList={profileList} />
              </div>
            )}
          </div>
          <div className="lacing-container-bottom">
            <div className="lacing-bottom"></div>
          </div>
        </div>
        {error && (
          <div className="error-container">
            {error.map((err) => (
              <button
                key={err.id}
                className="error"
                onClick={() => closeError(err.id)}
              >
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
