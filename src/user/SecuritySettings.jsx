import React from "react";
import ChangePassword from "./ChangePassword";

const SecuritySettings = () => {
  return (
    <div>
      <h3>Security Settings</h3>
      <p>Change your password or enable two-factor authentication.</p>
      <ChangePassword />
    </div>
  );
};

export default SecuritySettings;