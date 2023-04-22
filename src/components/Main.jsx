import { React } from "react";
import { setValueInChromeStorage } from "../service/Extension";

function Scratchpad() {
  const saveSettings = (e) => {
    e.preventDefault();
    const startDate = document.querySelector("#start-date").value;
    const endDate = document.querySelector("#end-date").value;

    const settings = {
      transformDuration: {
        startDate,
        endDate,
      },
    };

    setValueInChromeStorage("settings", settings);
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
            <input type="date" id="start-date" />
          </label>
          <label htmlFor="end-date">
            End Date:
            <input type="date" id="end-date" />
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
