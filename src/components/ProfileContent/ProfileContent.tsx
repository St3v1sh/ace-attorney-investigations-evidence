import { useEffect, useState } from "react";
import { Profile } from "../../utils/types";
import ItemCarousel from "../ItemCarousel/ItemCarousel";
import SafeImage from "../SafeImage/SafeImage";
import "./ProfileContent.css";

interface ProfileContentProps {
  profileList: Profile[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({ profileList }) => {
  const [activeProfile, setActiveProfile] = useState(0);

  const profileExists = activeProfile < profileList.length;

  // Change activeProfile to 0 when profileList changes.
  useEffect(() => {
    setActiveProfile(0);
  }, [profileList]);

  return (
    <>
      <div className="profile-content-container">
        <div className="profile-detail-container">
          <div className="profile-detail-container-background">
            <div className="profile-detail-padding">
              <div className="profile-detail">
                <div className="profile-detail-left">
                  <button className="profile-detail-image-container">
                    {/* Profile image */}
                    <SafeImage
                      src={
                        profileExists ? profileList[activeProfile].imageUrl : ""
                      }
                      alt=""
                      className="profile-detail-image"
                    />
                  </button>
                  <div className="profile-detail-ribbon-container">
                    <div className="profile-detail-ribbon">
                      <div className="profile-detail-ribbon-stitch">
                        <div className="profile-detail-ribbon-inner"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-info-container">
                  {/* Profile name */}
                  <span className="profile-title">
                    {profileExists && profileList[activeProfile].name
                      ? profileList[activeProfile].name
                      : "???"}
                  </span>
                  {/* Profile age */}
                  <span className="profile-age">
                    {"Age: " +
                      (profileExists ? profileList[activeProfile].age : "???")}
                  </span>
                  <div className="profile-description-container">
                    <div className="profile-description">
                      {/* Profile description */}
                      <span className="profile-description-text">
                        {profileExists
                          ? profileList[activeProfile].description
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ItemCarousel
          itemList={profileList}
          activeItem={activeProfile}
          setActiveItem={setActiveProfile}
        />
      </div>
    </>
  );
};

export default ProfileContent;
