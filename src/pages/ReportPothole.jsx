import { useState } from "react";

function ReportPothole() {
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");

  const [complaintId, setComplaintId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location.trim()) {
      alert("Please enter the pothole location.");
      return;
    }

    if (!severity) {
      alert("Please select the severity.");
      return;
    }

    // Generate complaint ID
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const newComplaintId = `PTH-2026-${randomNumber}`;

    // Save complaint data
    const complaint = {
      id: newComplaintId,
      location: location,
      photo: photo ? photo.name : "",
      description: description,
      severity: severity,
      status: "Reported",
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "pavetrackComplaint",
      JSON.stringify(complaint)
    );

    setComplaintId(newComplaintId);
    setSubmitted(true);
  };

  return (
    <div className="page">

      {!submitted ? (
        <>
          <h1>Report a Pothole</h1>

          <p>
            Help us make your roads safer. Provide the required details below.
          </p>

          <form className="form-box" onSubmit={handleSubmit}>

            <label>Location</label>

            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <label>Upload Photo / Video</label>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />

            <label>Description</label>

            <textarea
              placeholder="Describe the issue (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Severity</label>

            <div className="severity-buttons">

              <button
                type="button"
                className={severity === "Low" ? "selected" : ""}
                onClick={() => setSeverity("Low")}
              >
                Low
              </button>

              <button
                type="button"
                className={severity === "Medium" ? "selected" : ""}
                onClick={() => setSeverity("Medium")}
              >
                Medium
              </button>

              <button
                type="button"
                className={severity === "High" ? "selected" : ""}
                onClick={() => setSeverity("High")}
              >
                High
              </button>

              <button
                type="button"
                className={severity === "Critical" ? "selected" : ""}
                onClick={() => setSeverity("Critical")}
              >
                Critical
              </button>

            </div>

            <button
              type="submit"
              className="submit-button"
            >
              Submit Complaint
            </button>

          </form>
        </>
      ) : (

        <div className="success-box">

          <h1>✅ Complaint Submitted!</h1>

          <p>Your pothole complaint has been successfully recorded.</p>

          <div className="complaint-id-box">
            <span>Complaint ID</span>

            <strong>{complaintId}</strong>
          </div>

          <p>
            Please save this Complaint ID to track your complaint.
          </p>

          <div className="status-box">
            <span>Status</span>
            <strong>🟡 Reported</strong>
          </div>

        </div>

      )}

    </div>
  );
}

export default ReportPothole;