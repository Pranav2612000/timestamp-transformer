import { React, useEffect, useState } from "react";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  getValueFromChromeStorage,
  setValueInChromeStorage,
} from "../service/Extension";
import { validateDateFormat } from "../service/Timestamp";

function Scratchpad() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const getSettings = async () => {
      const storedSettings = await getValueFromChromeStorage("settings");
      setSettings(storedSettings);
    };
    getSettings();
  }, []);
  const saveSettings = async (e) => {
    e.preventDefault();

    if (settings.format && !validateDateFormat(settings.format)) {
      NotificationManager.error(
        "Invalid Date format. Please update the format and try again"
      );
      return;
    }
    try {
      await setValueInChromeStorage("settings", settings);
      NotificationManager.success(
        " Settings Updated! You can close the settings page now "
      );
    } catch (err) {
      console.log(err);
      NotificationManager.error(
        "Error updating settings. Please refresh the page and try again"
      );
    }
  };

  const onChange = (key, value) => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      [key]: value,
    }));
  };

  return (
    <>
      <NotificationContainer />
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
          <h3>Date Format: </h3>
          <label htmlFor="format">
            Format: (
            <small>
              DD - Date, MM - Month, YYYY - Year, hh - hour, mm - minutes, ss -
              seconds
            </small>
            )
            <br />
            <input
              type="text"
              id="format"
              value={settings.format}
              onChange={(e) => onChange("format", e.target.value)}
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
