import { React, useEffect, useState } from "react";
import {
  getValueFromChromeStorage,
  setValueInChromeStorage,
} from "../service/Extension";

function Scratchpad() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const getSettings = async () => {
      const storedSettings = await getValueFromChromeStorage("settings");
      setSettings(storedSettings);
    };
    getSettings();
  }, []);
  const saveSettings = (e) => {
    e.preventDefault();
    setValueInChromeStorage("settings", settings);
  };

  const onChange = (key, value) => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      [key]: value,
    }));
  };

  return (
    <>
      <h1> Settings </h1>
      <br />
      <main className="scratchpad-container">
        <form onSubmit={saveSettings}>
          <h3>Auto transform dates between:</h3>
          <label htmlFor="start-date">
            Start Date:
            <input
              type="date"
              id="start-date"
              value={settings.startDate}
              onChange={(e) => onChange("startDate", e.target.value)}
            />
          </label>
          <br />
          <br />
          <label htmlFor="end-date">
            End Date:
            <input
              type="date"
              id="end-date"
              value={settings.endDate}
              onChange={(e) => onChange("endDate", e.target.value)}
            />
          </label>
          <br />
          <br />
          <br />
          <button type="submit" onSubmit={saveSettings}>
            Save
          </button>
        </form>
      </main>
    </>
  );
}
export default Scratchpad;
