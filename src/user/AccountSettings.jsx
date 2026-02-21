import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import SecuritySettings from "./SecuritySettings";


const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="account-settings">
      <h2>Account Settings</h2>

      {/* Navigation Tabs */}
      <div className="settings-tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </button>       
        <button
          className={activeTab === "security" ? "active" : ""}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>        
      </div>

      {/* Section Content */}
      <div className="settings-content">
        {activeTab === "profile" && <ProfileInfo />}        
        {activeTab === "security" && <SecuritySettings />}        
      </div>
    </div>
  );
};

export default AccountSettings;