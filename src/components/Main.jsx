import { React } from "react";

function Scratchpad() {
  return (
    <>
      <h1> Settings </h1>
      <br />
      <main className="scratchpad-container">
        <form>
          <h3>Auto transform dates between:</h3>
          <label htmlFor="start-date">
            Start Date:
            <input type="date" id="start-date" />
          </label>
          <label htmlFor="end-date">
            End Date:
            <input type="date" id="end-date" />
          </label>
        </form>
      </main>
    </>
  );
}
export default Scratchpad;
