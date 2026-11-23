"use client";

import { useState } from "react";

// shortcut: no verification backend exists yet, so the form says plainly that nothing was checked; wire data-endpoint when the API exists.
export default function VerifyForm() {
  const [status, setStatus] = useState("");

  return (
    <form
      className="verify__form"
      data-endpoint=""
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const id = new FormData(e.currentTarget).get("certificateId")?.toString().trim();
        setStatus(
          id
            ? "Verification is not connected yet, so nothing was checked. Email the team to confirm this certificate."
            : "Enter the certificate ID printed on the certificate.",
        );
      }}
    >
      <label htmlFor="certificateId">Certificate ID</label>
      <div className="verify__row">
        <input id="certificateId" name="certificateId" type="text" autoComplete="off" inputMode="text" placeholder="As printed on the certificate" />
        <button type="submit" className="btn">Verify</button>
      </div>
      <p className="verify__status" role="status">{status}</p>
    </form>
  );
}
